import { useEffect, useState, useContext } from 'react'
import { Button, View, ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form'
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button'
import DateTimePicker from '@react-native-community/datetimepicker'
import Checkbox from 'expo-checkbox'

import { Label, LabelTextInput } from '../components/LabelTextInput'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

export function MedicalHistory({route, navigation}){
    const isFocused = useIsFocused()
    const { profile } = useContext(ProfileContext)
    const { handleSubmit, control, setValue, reset } = useForm({
        defaultValues: {
            is_good_health: true,
            has_tobaco: false,
            has_alcohol_drugs: false,
            bleeding_time: '',
            is_pregnant: false,
            is_nursing: false,
            has_birth_pills: false,
            blood_type: '',
            blood_pressure: '',
            med_history_condition: [],
            med_history_illness_surgery: [],
            med_history_hospitalized: [],
            med_history_medication: []
        }
    })
    const [isFemale, setIsFemale] = useState(false)
    const [loading, setLoading] = useState(false)

    async function fetchIsFemale(patient_id){
        try {
            const { data, error } = await supabase.from('patient')
                .select('gender')
                .eq('id', patient_id)
                .single()
            if (error)
                throw error
            setIsFemale(data.gender === 2)
        } catch (error){
            console.log(error)
        }
    }

    async function fetchHistory(patient_id){
        try {
            const { data, error } = await supabase.from('medical_history')
                .select(`
                    is_good_health,
                    med_history_condition (
                        name
                    ),
                    med_history_illness_surgery (
                        name
                    ),
                    med_history_hospitalized (
                        hospitalized_at,
                        reason
                    ),
                    med_history_medication (
                        name
                    ),
                    has_tobaco,
                    has_alcohol_drugs,
                    medicine_allergy (
                        id,
                        name
                    ),
                    bleeding_time,
                    is_pregnant,
                    is_nursing,
                    blood_type,
                    blood_pressure,
                    med_history_option (
                        id,
                        name
                    )
                `)
                .eq('patient_id', patient_id)
                .single()
            if (error)
                throw error

            console.log(data)
            setValue('is_good_health', data.is_good_health)
            setValue('med_history_condition', data.med_history_condition)
            setValue('med_history_illness_surgery', data.med_history_illness_surgery)
            setValue('med_history_hospitalized', data.med_history_hospitalized.map((hospital, _) => ({
                hospitalized_at: new Date(Date.parse(hospital.hospitalized_at)),
                reason: hospital.reason
            })))
            setValue('med_history_medication', data.med_history_medication)
            setValue('has_tobaco', data.has_tobaco)
            setValue('has_alcohol_drugs', data.has_alcohol_drugs)
            setValue('med_history_medication', data.med_history_medication)
            data.medicine_allergy.forEach((medAllergy, _) => {
                setValue(`medicine_allergy.${medAllergy.id}`, true)
            })
            setValue('bleeding_time', data.bleeding_time.toString())
            setValue('is_pregnant', data.is_pregnant)
            setValue('is_nursing', data.is_nursing)
            setValue('blood_type', data.blood_type)
            setValue('blood_pressure', data.blood_pressure)
            data.med_history_option.forEach((option, _) => {
                setValue(`med_history_option.${option.id}`, true)
            })
        } catch (error){
            console.log(error)
        }
    }

    async function updateHistory(form){
        const patient_id = profile.is_patient ? profile.patient_id : route.params.id
        try {
            setLoading(true)
            // Update non-array attributes
            const { data : medHistory, error : historyError } = await supabase.from('medical_history')
                .update({
                    is_good_health: form.is_good_health,
                    has_tobaco: form.has_tobaco,
                    has_alcohol_drugs: form.has_alcohol_drugs,
                    bleeding_time: form.bleeding_time,
                    is_pregnant: form.is_pregnant,
                    is_nursing: form.is_nursing,
                    has_birth_pills: form.has_birth_pills,
                    blood_type: form.blood_type,
                    blood_pressure: form.blood_pressure
                })
                .eq('patient_id', patient_id)
                .single()
            if (historyError)
                throw historyError
            // Delete one-to-many attributes
            const { error : conditionError } = await supabase.from('med_history_condition')
                .delete()
                .eq('medical_history_id', medHistory.id)
            if (conditionError)
                throw conditionError

            const { error : illOpError } = await supabase.from('med_history_illness_surgery')
                .delete()
                .eq('medical_history_id', medHistory.id)
            if (illOpError)
                throw illOpError

            const { error : hospitalError } = await supabase.from('med_history_hospitalized')
                .delete()
                .eq('medical_history_id', medHistory.id)
            if (hospitalError)
                throw hospitalError

            const { error : medicationError } = await supabase.from('med_history_medication')
                .delete()
                .eq('medical_history_id', medHistory.id)
            if (medicationError)
                throw medicationError

            // Insert updated one-to-many attributes
            const { error : updateConditionErr } = await supabase.from('med_history_condition')
                .insert(form.med_history_condition.map((med_history_condition, _) => (
                    {...med_history_condition, medical_history_id : medHistory.id}
                )))
            if (updateConditionErr)
                throw updateConditionErr

            const { error : updateIllOpErr } = await supabase.from('med_history_illness_surgery')
                .insert(form.med_history_illness_surgery.map((illness_surgery, _) => (
                    {...illness_surgery, medical_history_id : medHistory.id}
                )))
            if (updateIllOpErr)
                throw updateIllOpErr

            const { error: updateHospitalErr } = await supabase.from('med_history_hospitalized')
                .insert(form.med_history_hospitalized.map((hospitalized, _) => (
                    {...hospitalized, medical_history_id : medHistory.id}
                )))
            if (updateHospitalErr)
                throw updateHospitalErr

            const { error: updateMedicationErr} = await supabase.from('med_history_medication')
                .insert(form.med_history_medication.map((medication, _) => (
                    {...medication, medical_history_id : medHistory.id}
                )))
            if (updateHospitalErr)
                throw updateMedicationErr

            // Delete many-to-many attributes
            const { error : deleteMedAllergyErr } = await supabase.from('med_history_allergy')
                .delete()
                .eq('medical_history_id', medHistory.id)
            if (deleteMedAllergyErr)
                throw deleteMedAllergyErr
            
            const { error : deleteMedHaveErr } = await supabase.from('med_history_have')
                .delete()
                .eq('medical_history_id', medHistory.id)
            if (deleteMedHaveErr)
                throw deleteMedHaveErr

            // Insert new 
            const allergyIds = Object.keys(form.medicine_allergy).filter(id => form.medicine_allergy[id])
            const { error : updateMedAllergyErr } = await supabase.from('med_history_allergy')
                .insert(
                    allergyIds.map(allergyId => ({
                        medical_history_id : medHistory.id,
                        medicine_allergy_id : allergyId
                    }))
                )
            if (updateMedAllergyErr)
                throw updateMedAllergyErr
            
            const optionIds = Object.keys(form.med_history_option).filter(id => form.med_history_option[id])
            const { error : updateMedHaveErr }= await supabase.from('med_history_have')
                .insert(
                    optionIds.map(optionId => ({
                        medical_history_id : medHistory.id,
                        option_id : optionId
                    }))
                )
            if (updateMedHaveErr)
                throw updateMedHaveErr
            navigation.goBack()
        } catch (error){
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isFocused){
            if (profile.is_patient) {
                fetchHistory(profile.patient_id)
                fetchIsFemale(profile.patient_id)
            } else {
                console.log(route.params.id)
                fetchHistory(route.params.id)
                fetchIsFemale(route.params.id)
            }  
        }
    }, [isFocused])

    return (
        <View>
            {!profile.is_patient && <Button title='Save changes' onPress={handleSubmit(updateHistory)} 
                disabled={loading} />}
            <MedicalHistoryForm control={control} isFemale={isFemale}  />
        </View>
    )
}

function MedicalHistoryForm({control, isFemale}){
    const [showCondition, setShowCondition] = useState(false)
    const [showIllness, setShowIllness] = useState(false)
    const [showHospital, setShowHospital] = useState(false)
    const [showMedication, setShowMedication] = useState(false)

    const [medAllergies, setMedAllergies] = useState([])
    const [medOptions, setMedOptions] = useState([])

    const [showDates, setShowDates] = useState([])
    const dates = useWatch({name: 'med_history_hospitalized', control: control})

    const { profile : {is_patient} } = useContext(ProfileContext)

    const { fields : conditions, append: condition_append, remove: condition_remove } = useFieldArray({
        name : 'med_history_condition', control : control
    })
    const { fields : ill_ops, append : ill_op_append, remove : ill_op_remove } = useFieldArray({
        name : 'med_history_illness_surgery', control : control
    })
    const { fields : hospitals, append : hospital_append, remove : hospital_remove } = useFieldArray({
        name : 'med_history_hospitalized', control : control
    })
    const { fields : medications, append : medication_append, remove: medication_remove } = useFieldArray({
        name : 'med_history_medication', control : control
    })

    async function fetch(){
        try {
            const { data : med_allergies, error : allergy_error } = await supabase.from('medicine_allergy')
                .select('*')
            if (allergy_error)
                throw allergy_error
            setMedAllergies(med_allergies)
            const { data, error } = await supabase.from('med_history_option')
                .select('*')
            if (error)
                throw error
            setMedOptions(data)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    useEffect(() => {
        if (conditions)
            setShowCondition(conditions.length > 0)
    }, [conditions])

    useEffect(() => {
        if (ill_ops)
            setShowIllness(ill_ops.length > 0)
    }, [ill_ops])

    useEffect(() => {
        if (hospitals)
            setShowHospital(hospitals.length > 0)
    }, [hospitals])

    useEffect(() => {
        if (medications)
            setShowMedication(medications.length > 0)
    }, [medications])

    useEffect(() => {
        if (dates)
            setShowDates(Array.from({ length: dates.length }, (_, k) => false))
    }, [dates])

    return (
        <ScrollView style={{padding: 5}}>
            <Label>Are you in a good health? </Label>
                <Controller control={control} name='is_good_health'
                    render={({field}) => (
                        <RadioButtonGroup selected={field.value} containerStyle={{flexDirection: 'row'}} 
                        onSelected={is_patient ? () => {} : (value) => field.onChange(value)}>
                            <RadioButtonItem value={true} label='Yes' />
                            <RadioButtonItem value={false} label='No' />
                        </RadioButtonGroup>
                    )}
                />
            <Label>Are you under medical treatment now? </Label>
            <RadioButtonGroup selected={showCondition} containerStyle={{flexDirection: 'row'}} 
            onSelected={is_patient ? () => {} : (value) => field.onChange(value)} >
                <RadioButtonItem value={true} label='Yes' />
                <RadioButtonItem value={false} label='No' />
            </RadioButtonGroup>
            {showCondition && (
                <View>
                    <Label>If so, what is the condition being treated?</Label>
                    {conditions.map((condition, i) => (
                        <View key={i}>
                            <LabelTextInput name={`med_history_condition[${i}].name`} control={control} 
                                editable={!is_patient} />
                            {!is_patient && <Button title='Delete' onPress={() => condition_remove(i)} />}
                        </View>
                    ))}
                    {!is_patient && <Button title='Add condition' onPress={() => condition_append({name: ''})} />}
                </View>
            )}
            <Label>Have you ever had serious illness or surgical conditions? </Label>
            <RadioButtonGroup selected={showIllness} containerStyle={{flexDirection: 'row'}} 
            onSelected={is_patient ? () => {} : (value) => setShowIllness(value)}>
                <RadioButtonItem value={true} label='Yes' />
                <RadioButtonItem value={false} label='No' />
            </RadioButtonGroup>
            {showIllness && (
                <View>
                    <Label>If so, what illness or operation?</Label>
                    {ill_ops.map((ill_op, i) => (
                        <View key={i}>
                            <LabelTextInput name={`med_history_illness_surgery[${i}].name`} control={control} 
                                editable={!is_patient} />
                            {!is_patient && <Button title='Delete' onPress={() => ill_op_remove(i)} />}
                        </View>
                    ))}
                    {!is_patient && <Button title='Add illness or surgergy' onPress={() => ill_op_append({name: ''})} />}
                </View>
            )}
            <Label>Have you ever been hospitalized? </Label>
            <RadioButtonGroup selected={showHospital} containerStyle={{flexDirection: 'row'}}  
            onSelected={is_patient ? () => {} : (value) => setShowHospital(value)}>
                <RadioButtonItem value={true} label='Yes' />
                <RadioButtonItem value={false} label='No' />
            </RadioButtonGroup>
            {showHospital && (
                <View>
                    <Label>If so, when and why?</Label>
                    {hospitals.map((hospital, i) => (
                        <View key={i}>
                            <Label>Hospitalized at: {dates[i] && dates[i].hospitalized_at.toLocaleDateString()} </Label>
                            { showDates[i] && <Controller name={`med_history_hospitalized[${i}].hospitalized_at`} 
                                control={control}
                                render={({field}) => (
                                    <DateTimePicker mode='date' value={field.value} onChange={(event, date) => {
                                        setShowDates(Array.from({ length: showDates.length }, (_, k) => false))
                                        field.onChange(date)
                                    }} />
                                )} /> }
                            {!is_patient && <Button title='Change' onPress={() => setShowDates(
                                showDates.map((showDate, j) => (i === j))
                            )} />}
                            <LabelTextInput label='Reason' name={`med_history_hospitalized[${i}].reason`} control={control} 
                                editable={!is_patient} />
                            {!is_patient && <Button title='Delete' onPress={() => {
                                hospital_remove(i)
                                // setShowDates(showDates.filter((showDate, j) => i !== j))
                            }} />}
                        </View>
                    ))}
                    {!is_patient && <Button title='Add hospitalization' onPress={() => {
                        hospital_append({
                                hospitalized_at: new Date(),
                                reason: ''
                            })
                        // setShowDates([...showDates, false])
                        }} />}
                </View>
            )}
            <Label>Are you taking any prescription/non-prescription medication? </Label>
            <RadioButtonGroup selected={showMedication} containerStyle={{flexDirection: 'row'}}
            onSelected={is_patient ? () => {} : (value) => setShowMedication(value)}>
                <RadioButtonItem value={true} label='Yes' />
                <RadioButtonItem value={false} label='No' />
            </RadioButtonGroup>
            {showMedication && (
                <View>
                    <Label>If so, please specify</Label>
                    {medications.map((medication, i) => (
                        <View key={i} >
                            <LabelTextInput name={`med_history_medication[${i}].name`} control={control} 
                                editable={!is_patient} />
                            {!is_patient && <Button title='Delete' onPress={() => medication_remove(i)} />}
                        </View>
                    ))}
                    {!is_patient && <Button title='Add medication' onPress={() => medication_append({name: ''})} />}
                </View>
            )}
            <Label>Do you use tobacco products? </Label>
                <Controller control={control} name='has_tobaco'
                    render={({field}) => (
                        <RadioButtonGroup selected={field.value} containerStyle={{flexDirection: 'row'}} 
                        onSelected={is_patient ? () => {} : (value) => field.onChange(value)}>
                            <RadioButtonItem value={true} label='Yes' />
                            <RadioButtonItem value={false} label='No' />
                        </RadioButtonGroup>
                    )}
                />
            <Label>Do you use alcohol, cocaine or other dangerous drugs? </Label>
                <Controller control={control} name='has_alcohol_drugs'
                    render={({field}) => (
                        <RadioButtonGroup selected={field.value} containerStyle={{flexDirection: 'row'}}
                        onSelected={is_patient ? () => {} : (value) => field.onChange(value)}>
                            <RadioButtonItem value={true} label='Yes' />
                            <RadioButtonItem value={false} label='No' />
                        </RadioButtonGroup>
                    )}
                />
            <Label>Are you allergic to any of the following?</Label>
            {medAllergies.map((medAllergy, i) => (
                <View key={i} style={{flexDirection : 'row'}}>
                    <Controller name={`medicine_allergy.${medAllergy.id}`} control={control}
                        defaultValue={false}
                        render={({field}) => (
                            <Checkbox style={{marginHorizontal: 10}} value={field.value} 
                            onValueChange={is_patient ? () => {} :field.onChange} />
                        )} />
                    <Label>{medAllergy.name}</Label>
                </View>
            ))}
            <LabelTextInput label='Bleeding Time (minutes)' name='bleeding_time' control={control} 
                rules={{pattern: {value: /[0-9]+/, message: 'Only numeric value'}}} keyboardType='numeric'
                editable={!is_patient} />
            { isFemale && (
                <>
                    <Label>Are you pregnant? </Label>
                    <Controller control={control} name='is_pregnant'
                        render={({field}) => (
                            <RadioButtonGroup selected={field.value} containerStyle={{flexDirection: 'row'}}
                            onSelected={is_patient ? () => {} : (value) => field.onChange(value)}>
                                <RadioButtonItem value={true} label='Yes' />
                                <RadioButtonItem value={false} label='No' />
                            </RadioButtonGroup>
                        )}
                    />
                    <Label>Are you nursing? </Label>
                    <Controller control={control} name='is_nursing'
                        render={({field}) => (
                            <RadioButtonGroup selected={field.value} containerStyle={{flexDirection: 'row'}}
                            onSelected={is_patient ? () => {} : (value) => field.onChange(value)}>
                                <RadioButtonItem value={true} label='Yes' />
                                <RadioButtonItem value={false} label='No' />
                            </RadioButtonGroup>
                        )}
                    />
                    <Label>Are you taking birth control pills? </Label>
                    <Controller control={control} name='have_birth_pills'
                        render={({field}) => (
                            <RadioButtonGroup selected={field.value} containerStyle={{flexDirection: 'row'}}
                            onSelected={is_patient ? () => {} : (value) => field.onChange(value)}>
                                <RadioButtonItem value={true} label='Yes' />
                                <RadioButtonItem value={false} label='No' />
                            </RadioButtonGroup>
                        )}
                    />
                </>
            )}
            <LabelTextInput label='Blood Pressure' name='blood_pressure' control={control} 
                editable={!is_patient}/>
            <Label>Do you have or have you had any of the following? Check which apply</Label>
            {medOptions.map((medOption, i) => (
                <View key={i} style={{flexDirection : 'row'}}>
                    <Controller name={`med_history_option.${medOption.id}`} control={control}
                        defaultValue={false}
                        render={({field}) => (
                            <Checkbox style={{marginHorizontal: 10}} value={field.value} 
                            onValueChange={is_patient ? () => {} :field.onChange} />
                        )} />
                    <Label>{medOption.name}</Label>
                </View>
            ))}
        </ScrollView>
    )
}