import { useEffect, useState, useContext, useCallback } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { View, ScrollView, RefreshControl } from 'react-native'
import { useFieldArray, useForm } from 'react-hook-form'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { Label, LabelTextInput } from '../components/LabelTextInput'
import { Button, ListItemView, ListItemText, Bold } from '../components/StyledComponents'

export function TreatmentPlans({route, navigation}){
    const isFocused = useIsFocused()
    const [treatmentPlans, setTreatmentPlans] = useState([])
    const { profile } = useContext(ProfileContext)
    const { handleSubmit, control, reset } = useForm()
    const { fields, append, remove } = useFieldArray({name: 'procedures', control: control})
    const [loading, setLoading] = useState(false)

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
            setLoading(true)
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
            reset()
        } catch (error){
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function deleteTreatmentPlan(i){
        try {
            const { error : deleteTreatProcErr } = await supabase.from('treatment_plan_procedure')
                .delete()
                .eq('treatment_plan_id', treatmentPlans[i].id)
            if (deleteTreatProcErr)
                throw deleteTreatProcErr

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

    async function fetch(){
        if (profile.is_patient)
                fetchTreatment(profile.patient_id)
            else
                fetchTreatment(route.params.id)
    }

    useEffect(() => {
        if (isFocused){
            fetch()
        }
    }, [isFocused])

    const [refreshing, setRefreshing] = useState(false)
    
    const onRefresh = useCallback(() => {
        setRefreshing(true)
        fetch().then(() => setRefreshing(false))
    }, [])

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
                    <Button title='Add treatment plan' onPress={handleSubmit(addTreatmentPlan)} disabled={loading} />
                </View>
            )}
        </ScrollView>
    )
}