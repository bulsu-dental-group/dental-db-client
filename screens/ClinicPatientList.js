import { useEffect, useState, useContext } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import * as Linking from 'expo-linking'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { Button, ListItemText, ListItemView } from '../components/StyledComponents'

export function ClinicPatientList({navigation}){
    const isFocused = useIsFocused()
    const [patients, setPatients] = useState([])
    const { profile } = useContext(ProfileContext)

    async function fetchPatients(){
        try {
            const user = supabase.auth.user()
            const { data, error } = await supabase.from('clinic_patient')
                .select(`
                    patient (
                        id,
                        first_name,
                        last_name,
                        contact_number
                    )
                `)
                .eq('clinic_id', profile.clinic_id)
            if (error)
                throw error
            setPatients(data.map((item) => item.patient))
            console.log(patients)
        } catch (error){
            console.log(error)
        }
    }

    async function deletePatient(i){
        try {
            const { data, error } = await supabase.from('clinic_patient')
                .delete()
                .eq('clinic_id', patients[i].id)
            if (error)
                throw error
            else
                setPatients(patients.filter((_, k) => i !== k))
        } catch (error){
            console.log(error)
        }
    }

    async function requestRecall(i){
        try {
            const { error } = await supabase.from('clinic_patient')
                .update({is_for_recall: true})
                .match({
                    clinic_id: profile.clinic_id,
                    patient_id: patients[i].id
                })
            if (error)
                throw error
            Linking.openURL(`tel:${patients[i].contact_number}`)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        if (isFocused){
            fetchPatients()
        }
    }, [isFocused])

    return (
        <View>
            {patients.map((patient, i) => (
                <ListItemView key={i}>
                    <Pressable onPress={() => navigation.navigate('View Patient', { id: patient.id })}
                        style={{flex: 4}}
                    >
                        <ListItemText>Name: {patient.first_name} {patient.last_name}</ListItemText>
                        <ListItemText>Contact Number: {patient.contact_number}</ListItemText>
                        {/* <Text>Last Visit: {patient.last_visit}</Text> */}
                    </Pressable>
                    <Button title='Call' onPress={() => requestRecall(i)} style={{flex: 2}} />
                    <Button title='Delete' onPress={() => deletePatient(i)} style={{flex: 2}} />
                </ListItemView>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    patient_btn : {
        backgroundColor: 'orange',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        flexDirection: 'row'
    },
})