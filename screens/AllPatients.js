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
            console.log(clinic_patients)
        } catch (error){
            console.log(error)
        }
    }

    async function addPatient(i){
        try {
            const { data, error } = await supabase.from('clinic_patient')
                .insert([{
                    clinic_id: profile.clinic_id,
                    patient_id: patients[i].id
                }])
            if (error)
                throw error
            setClinicPatients([...clinicPatients, patients[i].id])
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
            <View style={{flexDirection: 'row'}}>
                <Text>Search: </Text>
                <StyledTextInput onChangeText={text => filterName(text)} />
            </View>
            {patientView.map((patient, i) => (
                <ListItemView key={i}>
                    <ListItemText style={{flex: 5}}>{patient.first_name} {patient.last_name}</ListItemText>
                    {patient.id in clinicPatients ? 
                        <Button style={{flex: 1}} title='Already added' disabled={true} /> :
                        <Button style={{flex: 1}} title='Add' onPress={() => addPatient(i)} />
                    }
                </ListItemView>
            ))}
        </View>
    )
}