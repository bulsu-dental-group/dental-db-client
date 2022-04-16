import { useEffect, useState, useContext } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { View, Text } from 'react-native'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { StyledTextInput, ListItemText, ListItemView, Button } from '../components/StyledComponents'

export function AllPatients({navigation}){
    const isFocused = useIsFocused()
    const { profile } = useContext(ProfileContext)
    const [patients, setPatients] = useState([])
    const [patientView, setPatientView] = useState([])
    const [clinicPatients, setClinicPatients] = useState([])

    async function fetch(){
        try {
            const { data, error } = await supabase.from('patient')
                .select('id, first_name, last_name')
            if (error)
                throw error
            setPatients(data)
            setPatientView(data)

            const { data : clinic_patients, error : clinicErr } = await supabase.from('clinic_patient')
                .select('patient_id')
                .eq('clinic_id', profile.clinic_id)
            if (clinicErr)
                throw clinicErr
            setClinicPatients(clinic_patients.map((clinic_patient) => (
                clinic_patient.patient_id
            )))
        } catch (error){
            console.log(error)
        }
    }

    async function addPatient(id){
        try {
            const { error } = await supabase.from('clinic_patient')
                .insert([{
                    clinic_id: profile.clinic_id,
                    patient_id: id
                }])
            if (error)
                throw error
            setClinicPatients([...clinicPatients, id])
        } catch (error){
            throw error
        }
    }

    function filterName(text){
        setPatientView(patients.filter(
            patient => (
                `${patient.first_name} ${patient.last_name}`.toLowerCase()
                    .includes(text.toLowerCase())
            )
        ))
    }

    useEffect(() => {
        if (isFocused)
            fetch()
    }, [isFocused])

    return (
        <View>
            <View style={{flexDirection: 'row', margin: 10}}>
                <Text>Search: </Text>
                <StyledTextInput style={{flex: 4}} onChangeText={text => filterName(text)} />
            </View>
            {patientView.map((patient, i) => (
                <ListItemView key={i}>
                    <ListItemText style={{flex: 5}}>{patient.first_name} {patient.last_name}</ListItemText>
                    {clinicPatients.includes(patient.id) ? 
                        <Button style={{flex: 1}} title='Already added' disabled={true} /> :
                        <Button style={{flex: 1}} title='Add' onPress={() => addPatient(patient.id)} />
                    }
                </ListItemView>
            ))}
        </View>
    )
}