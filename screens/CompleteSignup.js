import { useState, useEffect, useContext } from 'react'
import { Button } from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { Label, LabelTextInput } from '../components/LabelTextInput'
import { Form } from '../components/Form'

export function CompleteSignup({navigation}){
    const [isPatient, setIsPatient] = useState(true)
    const methods = useForm({defaultValues:{
        first_name: '',
        last_name: '',
        name: '',
        age: '',
        gender: 1,
        birth_date: new Date(),
        contact_number: '',
        street: '',
        city: '',
        province: '',
        profession: ''
    }})
    const { handleSubmit } = methods

    async function onComplete(form){
        try {
            console.log(form)
            // Create profile
            const user = supabase.auth.user()
            const { data, error } = await supabase.from('profile').insert([
                {
                    'id' : user.id,
                    'is_patient' : isPatient
                }
            ])
            if (error)
                throw error
            // Create patient or clinic
            var new_data
            if (isPatient){
                const { data, error } = await supabase.from('patient').insert([
                    {
                        'profile_id'    : user.id,
                        'first_name'    : form.first_name,
                        'last_name'     : form.last_name,
                        'age'           : form.age,
                        'gender'        : form.gender,
                        'birth_date'    : form.birth_date.toISOString(),
                        'contact_number': form.contact_number,
                        'street'        : form.street,
                        'city'          : form.city,
                        'province'      : form.province,
                        'profession'    : form.profession,
                        'email'         : user.email
                    }
                ])
                .single()
                if (error)
                    throw error
                new_data = data
            } else {
                const { data, error } = await supabase.from('clinic').insert([
                    {
                        'profile_id'    : user.id,
                        'name'          : form.name,
                        'street'        : form.street,
                        'city'          : form.city,
                        'province'      : form.province,
                        'contact_number': form.contact_number,
                        'email'         : user.email
                    }
                ])
                .single()
                if (error)
                    throw error
                new_data = data
            }
            // Update profile with created patient or clinic
            console.log(new_data)
            if (isPatient){
                const { data, error } = await supabase.from('profile').update(
                    {
                        'patient_id' : new_data.id
                    })
                    .eq('id', user.id)
                if (error)
                    throw error
            } else {
                const { data, error } = await supabase.from('profile').update(
                    {
                        'clinic_id' : new_data.id
                    })
                    .eq('id', user.id)
                if (error)
                    throw error
            }
            // If patient, add allergy if there is 
            if (isPatient && form.allergies.length > 0){
                const { data, error } = await supabase.from('patient_allergy').insert(
                    form.allergies.map((allergy, i) => ({ name : allergy.name, patient_id: new_data.id}))
                )
                if (error)
                    throw error
            } else if (!isPatient && form.dentists.length > 0){
                const { data, error } = await supabase.from('dental_practitioner').insert(
                    form.dentists.map((dentist, i) => ({
                        first_name: dentist.first_name,
                        last_name : dentist.last_name,
                        prc_id : dentist.prc_id,
                        clinic_id : new_data.id
                    }))
                )
                if (error)
                    throw error
            }
            // If patient, add placeholder medical history and teeth
            if (isPatient){
                const { error : medHistoryErr } = await supabase.from('medical_history')
                    .insert([{
                        is_good_health: true,
                        has_tobaco: false,
                        has_alcohol_drugs: false,
                        bleeding_time: 0,
                        is_pregnant: false,
                        is_nursing: false,
                        has_birth_pills: false,
                        blood_type: '',
                        blood_pressure: '',
                        patient_id: new_data.id
                    }])
                if (medHistoryErr)
                    throw medHistoryErr
            }
            navigation.navigate('Home')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FormProvider {...methods}>
            <Label>Complete your sign-up by filling up the form below</Label>
            <Button onPress={() => setIsPatient(true)} title="Patient" />
            <Button onPress={() => setIsPatient(false)} title="Clinic" />
            <Form isPatient={isPatient}/>
            <Button onPress={handleSubmit(onComplete)} title="Complete sign-up" />
        </FormProvider>
    )
}