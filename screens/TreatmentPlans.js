import { useEffect, useState, useContext } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { View, Text } from 'react-native'
import { useFieldArray, useForm } from 'react-hook-form'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { Label, LabelTextInput } from '../components/LabelTextInput'
import { Button, ListItemView, ListItemText, Bold } from '../components/StyledComponents'

export function TreatmentPlans({route, navigation}){
    const isFocused = useIsFocused()
    const [treatmentPlans, setTreatmentPlans] = useState([])
    const { profile } = useContext(ProfileContext)
    const { handleSubmit, control } = useForm()
    const { fields, append, remove } = useFieldArray({name: 'procedures', control: control})

    async function fetchTreatment(patient_id){
        try {
            const { data, error} = await supabase.from('treatment_plan')
                .select(`
                    id,
                    name,
                    duration,
                    created_at,
                    procedure (
                        id,
                        name
                    )
                `)
                .eq('patient_id', patient_id)
            if (error)
                throw error
            console.log(data)
            setTreatmentPlans(data)
        } catch (error){
            console.log(error)
        }
    }

    async function addTreatmentPlan(form){
        try {
            const { data : treatment, error : treatmentErr } = await supabase.from('treatment_plan')
                .insert({
                    name: form.name,
                    duration: form.duration,
                    patient_id: route.params.id,
                })
                .single()
            if (treatmentErr)
                throw treatmentErr

            const { data : procedures, error : procedureErr } = await supabase.from('procedure')
                .insert(form.procedures.map((procedure, i) => ({
                    name: procedure.name,
                    patient_id: route.params.id
                })))
            if (procedureErr)
                throw procedureErr

            const { error } = await supabase.from('treatment_plan_procedure')
                .insert(procedures.map((procedure, i) => ({
                    treatment_plan_id : treatment.id,
                    procedure_id : procedure.id
                })))
            if (error)
                throw error

            setTreatmentPlans([...treatmentPlans, {
                ...treatment,
                procedure : procedures
            }])
        } catch (error){
            console.log(error)
        }
    }

    async function deleteTreatmentPlan(i){
        try {
            const { error : deleteTreatErr } = await supabase.from('treatment_plan')
                .delete()
                .eq('id', treatmentPlans[i].id)
            if (deleteTreatErr)
                throw deleteTreatErr

            setTreatmentPlans(treatmentPlans.filter((_, j) => i !== j))
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        if (isFocused){
            if (profile.is_patient)
                fetchTreatment(profile.patient_id)
            else
                fetchTreatment(route.params.id)
        }
    }, [isFocused])

    return (
        <View>
            {treatmentPlans.map((treatmentPlan, i) => (
                <ListItemView key={i}>
                    <View style={{flex: 4}}>
                        <ListItemText><Bold>Treatment name: </Bold>{treatmentPlan.name}</ListItemText>
                        <ListItemText><Bold>Duration: </Bold>{treatmentPlan.duration}</ListItemText>
                        <ListItemText><Bold>Created at: </Bold>{treatmentPlan.created_at}</ListItemText>
                        <ListItemText><Bold>Procedures: </Bold></ListItemText>
                        {treatmentPlan.procedure.map((proc, j) => (
                            <ListItemText key={j}>{proc.name}</ListItemText>
                        ))}
                    </View>
                    {!profile.is_patient && <Button style={{flex: 1}} title='Delete' onPress={() => deleteTreatmentPlan(i)} />}
                </ListItemView>
            ))}
            {!profile.is_patient && (
                <View>
                    <Label>New treatment plan</Label>
                    <LabelTextInput name='name' label='Treatment Name' control={control} 
                        rules={{required: 'Field required'}}/>
                    <LabelTextInput name='duration' label='Duration' control={control} />
                    <Label>Procedure</Label>
                    { fields.map((item, i) => (
                        <View key={i}>
                            <LabelTextInput name={`procedures[${i}].name`} control={control} 
                                rules={{required: 'Empty procedure not valid'}}/>
                            <Button title='Delete' onPress={() => remove(i)} />
                        </View>
                    ))}
                    <Button title='Add procedure' onPress={() => append({name: ''})} />
                    <Button title='Add treatment plan' onPress={handleSubmit(addTreatmentPlan)} />
                </View>
            )}
        </View>
    )
}