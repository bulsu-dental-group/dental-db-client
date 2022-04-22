import { useEffect, useContext, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { Button, View, ScrollView } from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { Form } from '../components/Form'
import { LabelTextInput, Label } from '../components/LabelTextInput'
import { HomeView } from '../components/StyledComponents'

export function EditProfile({navigation}){
    const isFocused = useIsFocused()
    const { profile } = useContext(ProfileContext)

    const methods = useForm({ 
        defaultValues: {
            dentists: []
        }
    })
    const { handleSubmit, reset, setValue, control, watch } = methods
    const dentists = watch('dentists')

    const { control : dentistControl, handleSubmit : dentistHandleSubmit, reset : dentistReset } = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            prc_id: ''
        }
    })
    const [loading, setLoading] = useState(false)

    async function fetchMeta(){
        try {
            reset()
            if (profile.is_patient){
                const { data, error } = await supabase.from('patient')
                    .select(`
                        first_name,
                        last_name,
                        age,
                        gender,
                        birth_date,
                        contact_number,
                        street,
                        city,
                        province,
                        profession,
                        patient_allergy (
                            name
                        )
                    `)
                    .eq('id', profile.patient_id)
                    .single()
                if (error)
                    throw error
                console.log(data)
                if (data)
                    setValue('first_name', data.first_name)
                    setValue('last_name', data.last_name)
                    setValue('age', data.age.toString())
                    setValue('gender', data.gender)
                    setValue('birth_date', new Date(Date.parse(data.birth_date)))
                    setValue('contact_number', data.contact_number)
                    setValue('street', data.street)
                    setValue('city', data.city)
                    setValue('province', data.province)
                    setValue('profession', data.profession)
                    setValue('allergies', data.patient_allergy)
            } else {
                const { data, error } = await supabase.from('clinic')
                    .select(`
                        name,
                        contact_number,
                        street,
                        city,
                        province
                    `)
                    .eq('id', profile.clinic_id)
                    .single()
                if (error)
                    throw error
                if (data)
                    setValue('name', data.name)
                    setValue('contact_number', data.contact_number)
                    setValue('street', data.street)
                    setValue('city', data.city)
                    setValue('province', data.province)
                const { data : dentists, error : dentistErr } = await supabase.from('dental_practitioner')
                    .select(`
                        id,
                        first_name,
                        last_name,
                        prc_id
                    `)
                    .eq('clinic_id', profile.clinic_id)
                if (dentistErr)
                    throw dentistErr
                setValue('dentists', dentists)
            }
        } catch (error){
            console.log(error)
        }
    }

    async function onUpdate(form){
        try {
            setLoading(true)
            if (profile.is_patient){
                const { data : patient, patientErr } = await supabase.from('patient').update(
                    {
                        'first_name'    : form.first_name,
                        'last_name'     : form.last_name,
                        'gender'        : form.gender,
                        'contact_number': form.contact_number,
                        'birth_date'    : form.birth_date,
                        'street'        : form.street,
                        'city'          : form.city,
                        'province'      : form.province,
                        'profession'    : form.profession
                    }
                )
                    .eq('id', profile.patient_id)
                    .single()
                if (patientErr)
                    throw patientErr

                const { error : deleteAllergyErr } = await supabase.from('patient_allergy')
                    .delete()
                    .eq('patient_id', patient.id)
                if (deleteAllergyErr)
                    throw deleteAllergyErr

                const { error : updateAllergyErr } = await supabase.from('patient_allergy')
                    .insert(form.allergies.map((allergy, i) => ({
                        name: allergy.name,
                        patient_id: patient.id
                    })))
                if (updateAllergyErr)
                    throw updateAllergyErr

            } else {
                const { error : clinicErr } = await supabase.from('clinic').update(
                    {
                        'name'          : form.name,
                        'street'        : form.street,
                        'city'          : form.city,
                        'province'      : form.province,
                        'contact_number': form.contact_number
                    }
                )
                    .eq('id', profile.clinic_id)
                    .single()
                if (clinicErr)
                    throw clinicErr
            }
        } catch (error){
            console.log(error)
        } finally {
            setLoading(false)
            navigation.navigate('Home')
        }
    }

    async function addPractitioner(form){
        try {
            setLoading(true)
            const { error } = await supabase.from('dental_practitioner')
                .insert([{
                    first_name: form.first_name,
                    last_name: form.last_name,
                    prc_id: form.prc_id,
                    clinic_id: profile.clinic_id
                }])
            if (error)
                throw error
            navigation.navigate('Home')
        } catch (error){
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function updatePractitioner(i){
        try {
            const { error } = await supabase.from('dental_practitioner')
                .update({
                    first_name: dentists[i].first_name,
                    last_name: dentists[i].last_name,
                    prc_id: dentists[i].prc_id
                })
                .eq('id', dentists[i].id)
            if (error)
                throw error
            dentistReset()
            navigation.navigate('Home')
        } catch (error){
            console.log(error)
        }
    }

    async function deletePractitioner(i){
        try {
            const { error : deletePracPatientsErr } = await supabase.from('clinic_patient')
                .update({dental_practitioner_id: ''})
                .eq('dental_practitioner_id', dentists[i].id)
            if (deletePracPatientsErr)
                throw deletePracPatientsErr

            const { error } = await supabase.from('dental_practitioner')
                .delete()
                .eq('id', dentists[i].id)
            if (error)
                throw error
            navigation.navigate('Home')
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        if (isFocused)
            fetchMeta()
    }, [isFocused])

    return (
        <ScrollView>
            <FormProvider {...methods}>
                <Form isPatient={profile.is_patient} isEdit={true} />
                <Button title='Save changes' onPress={handleSubmit(onUpdate)} disabled={loading} />
                {!profile.is_patient && <>
                    <Label>Dental Practitioners</Label>
                    {dentists.map((dentist, i) => (
                        <HomeView key={i}>
                            <LabelTextInput name={`dentists[${i}].first_name`} style={{backgroundColor: 'white'}} 
                                label='First Name' control={control} rules={{required: true}} />
                            <LabelTextInput name={`dentists[${i}].last_name`} label='Last Name' 
                                style={{backgroundColor: 'white'}} control={control} rules={{required: true}} />
                            <LabelTextInput name={`dentists[${i}].prc_id`} label='PRC ID' style={{backgroundColor: 'white'}}
                                control={control} rules={{required: true}} />
                            <Button title='Update' onPress={() => updatePractitioner(i)} />
                            <Button title='Delete' onPress={() => deletePractitioner(i)} />
                        </HomeView>
                    ))}
                    <Label>New Dental Practitioner</Label>
                    <LabelTextInput name={`first_name`} label='First Name'
                        control={dentistControl} rules={{required: true}} />
                    <LabelTextInput name={`last_name`} label='Last Name'
                        control={dentistControl} rules={{required: true}} />
                    <LabelTextInput name={`prc_id`} label='PRC ID'
                        control={dentistControl} rules={{required: true}} />
                    <Button title='Add' onPress={dentistHandleSubmit(addPractitioner)} disabled={loading} />
                </>}
            </FormProvider>
        </ScrollView>
    )
}