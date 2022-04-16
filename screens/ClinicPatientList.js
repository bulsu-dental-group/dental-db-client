import { useEffect, useState, useContext } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { View, Pressable } from 'react-native'
import * as Linking from 'expo-linking'
import Checkbox from 'expo-checkbox'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { Button, ListItemText, ListItemView, StyledTextInput, HomeView, Bold } from '../components/StyledComponents'
import { Label } from '../components/LabelTextInput'

export function ClinicPatientList({navigation}){
    const isFocused = useIsFocused()
    const [patients, setPatients] = useState([])
    const { profile } = useContext(ProfileContext)

    const [patientView, setPatientView] = useState([])
    const [search, setSearch] = useState('')
    const [isSearchRecall, setSearchRecall] = useState(false)

    async function fetchPatients(){
        try {
            const { data, error } = await supabase.from('clinic_patient')
                .select(`
                    patient (
                        id,
                        first_name,
                        last_name,
                        contact_number
                    ),
                    is_for_recall
                `)
                .eq('clinic_id', profile.clinic_id)
            if (error)
                throw error
            setPatients(data.map((item) => ({...item.patient, is_for_recall: item.is_for_recall})))
            setPatientView(data.map((item) => ({...item.patient, is_for_recall: item.is_for_recall})))
        } catch (error){
            console.log(error)
        }
    }

    async function deletePatient(id){
        try {
            const { data, error } = await supabase.from('clinic_patient')
                .delete()
                .eq('patient_id', id)
            if (error)
                throw error
            else
                setPatients(patients.filter((patient) => patient.id !== id))
                setPatientView(patientView.filter((patient) => patient.id !== id))
        } catch (error){
            console.log(error)
        }
    }

    async function setForRecall(id){
        try {
            const { error } = await supabase.from('clinic_patient')
                .update({is_for_recall: true})
                .match({
                    clinic_id: profile.clinic_id,
                    patient_id: id
                })
            if (error)
                throw error
            setPatients(patients.map((patient) => patient.id === id ? 
                {...patient, is_for_recall : true} : patient))
                setPatientView(patientView.map((patient) => patient.id === id ? 
                {...patient, is_for_recall : true} : patient))
        } catch (error){
            console.log(error)
        }
    }

    async function unsetForRecall(id){
        try {
            const { error } = await supabase.from('clinic_patient')
                .update({is_for_recall: false})
                .match({
                    clinic_id: profile.clinic_id,
                    patient_id: id
                })
            if (error)
                throw error
            setPatients(patients.map((patient) => patient.id === id ? 
                {...patient, is_for_recall : false} : patient))
            setPatientView(patientView.map((patient) => patient.id === id ? 
            {...patient, is_for_recall : false} : patient))
        } catch (error){
            console.log(error)
        }
    }

    function call(id){
        for (const patient of patients){
            if (patient.id === id){
                Linking.openURL(`tel:${patient.contact_number}`)
                break
            }
        }
    }

    function handleSearch(){
        setPatientView(patients.filter(
            patient => (
                `${patient.first_name} ${patient.last_name}`.toLowerCase()
                    .includes(search.toLowerCase())
                && (!isSearchRecall || patient.is_for_recall)
            )
        ))
    }

    useEffect(() => {
        if (isFocused){
            fetchPatients()
        }
    }, [isFocused])

    return (
        <View>
            <HomeView>
                <View style={{flexDirection: 'row', marginHorizontal: 10}} >
                    <Label>Search: </Label>
                    <StyledTextInput style={{margin: 10, flex: 4, backgroundColor: 'white'}} 
                        value={search} onChangeText={(text) => setSearch(text)} />
                </View>
                <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                    <Checkbox value={isSearchRecall} onValueChange={setSearchRecall} />
                    <Label style={{marginLeft: 10}}>For recall</Label>
                </View>
                <Button title='Search' onPress={handleSearch}/>
            </HomeView>
            {patientView.map((patient, i) => (
                <ListItemView key={i}>
                    <Pressable onPress={() => navigation.navigate('View Patient', { id: patient.id })}
                        style={{flex: 4}}
                    >
                        <ListItemText><Bold>Name: </Bold>{patient.first_name} {patient.last_name}</ListItemText>
                        <ListItemText><Bold>Contact Number: </Bold>{patient.contact_number}</ListItemText>
                    </Pressable>
                    <Button title='Call' onPress={() => call(patient.id)} style={{flex: 2}} />
                    {patient.is_for_recall ? 
                        <Button title='Unset for recall' onPress={() => unsetForRecall(patient.id)} style={{flex: 2}} /> :
                        <Button title='Set for recall' onPress={() => setForRecall(patient.id)} style={{flex: 2}} />
                    }
                    <Button title='Delete' onPress={() => deletePatient(patient.id)} style={{flex: 2}} />
                </ListItemView>
            ))}
        </View>
    )
}