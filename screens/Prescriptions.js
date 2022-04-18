import { useEffect, useState, useContext, useCallback } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { View, ScrollView, RefreshControl } from 'react-native'
import { useForm } from 'react-hook-form'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { LabelTextInput } from '../components/LabelTextInput'
import { Button, ListItemText, ListItemView } from '../components/StyledComponents'

export function Prescriptions({route, navigation}){
    const [prescriptions, setPrescriptions] = useState([])
    const isFocused = useIsFocused()
    const { control, handleSubmit } = useForm()
    const { profile } = useContext(ProfileContext)

    async function fetchPrescriptions(patient_id){
        try {
            const { data, error } = await supabase.from('prescription')
                .select(`
                    id,
                    medicine,
                    homecare_note,
                    created_at
                `)
                .eq('patient_id', patient_id)
            if (error)
                throw error
            if (data)
                setPrescriptions(data)
        } catch (error){
            console.log(error)
        }
    }

    async function addPrescription(form){
        try {
            const { data, error } = await supabase.from('prescription')
                .insert([{
                    medicine: form.medicine,
                    homecare_note: form.homecare_note,
                    patient_id: route.params.id,
                }])
                .single()
            if (error)
                console.log(error)
            if (data)
                setPrescriptions([...prescriptions, data])
        } catch (error){
            console.log(error)
        }
    }

    async function deletePrescription(i){
        try {
            const { error } = await supabase.from('prescription')
                .delete()
                .eq('id', prescriptions[i].id)
            if (error)
                throw error
            setPrescriptions(prescriptions.filter((item, k) => i !== k))
        } catch (error){
            console.log(error)
        }
    }

    async function fetch(){
        if (profile.is_patient)
                fetchPrescriptions(profile.patient_id)
            else
                fetchPrescriptions(route.params.id)
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
            {prescriptions.map((prescription, i) => (
                <ListItemView key={i}>
                    <View style={{flex: 4}}>
                        <ListItemText>Medicine: {prescription.medicine}</ListItemText>
                        <ListItemText>Homecare Note: {prescription.homecare_note}</ListItemText>
                        <ListItemText>Created at: {prescription.created_at}</ListItemText>
                    </View>
                    {!profile.is_patient && <Button style={{flex: 1}} title='Delete' onPress={() => deletePrescription(i)} />}
                </ListItemView>
            ))}
            {!profile.is_patient && (
                <View>
                    <LabelTextInput name='medicine' label='Medicine' control={control} rules={{required: 'Field required'}}/>
                    <LabelTextInput name='homecare_note' label='Homecare Note' rules={{required: 'Field required'}}
                        control={control} />
                    <Button title='Add' onPress={handleSubmit(addPrescription)} />
                </View>
            )}
        </ScrollView>
    )
}