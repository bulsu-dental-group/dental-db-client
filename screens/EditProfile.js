import { useEffect, useContext } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { Button } from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { Form } from '../components/Form'

export function EditProfile({navigation}){
    const isFocused = useIsFocused()
    const { profile } = useContext(ProfileContext)

    const methods = useForm()
    const { handleSubmit, reset, setValue } = methods

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
            if (profile.is_patient){
                const { data : patient, patientErr } = await supabase.from('patient').update(
                    {
                        'first_name'    : form.first_name,
                        'last_name'     : form.last_name,
                        'gender'        : form.gender,
                        'contact_number': form.contact_number,
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
                const { data : clinic, error : clinicErr } = await supabase.from('clinic').update(
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

                const { error : deleteDentistErr } = await supabase.from('dental_practitioner')
                    .delete()
                    .eq('clinic_id', clinic.id)
                if (deleteDentistErr)
                    throw deleteDentistErr

                const { error : updateDentistErr } = await supabase.from('dental_practitioner')
                    .insert(form.dentists.map((dentist, i) => ({
                        first_name: dentist.first_name,
                        last_name: dentist.last_name,
                        prc_id: dentist.prc_id,
                        clinic_id: clinic.id
                    })))
                if (updateDentistErr)
                    throw updateDentistErr
            }
        } catch (error){
            console.log(error)
        } finally {
            navigation.navigate('Home')
        }
    }

    useEffect(() => {
        if (isFocused)
            fetchMeta()
    }, [isFocused])

    return (
        <FormProvider {...methods}>
            <Form isPatient={profile.is_patient} />
            <Button title='Save changes' onPress={handleSubmit(onUpdate)} />
        </FormProvider>
    )
}