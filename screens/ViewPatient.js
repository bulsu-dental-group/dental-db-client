import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { View, Text } from 'react-native'

import { Button, HomeView } from '../components/StyledComponents'

import { supabase } from '../supabase'

export function ViewPatient({route, navigation}){
    const isFocused = useIsFocused()
    const patient_id = route.params.id
    const [patient, setPatient] = useState({})

    async function fetchPatient(){
        try {
            const { data, error} = await supabase.from('patient')
                .select(`
                    first_name,
                    last_name,
                    age,
                    email,
                    gender,
                    birth_date,
                    contact_number,
                    street,
                    city,
                    province,
                    profession,
                    patient_allergy(
                        name
                    )
                `)
                .eq('id', patient_id)
                .single()
            if (error)
                throw error
            setPatient(data)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPatient()
    }, [])

    return (
        <HomeView>
            <Text>{patient.first_name} {patient.last_name}, {patient.age}</Text>
            <Text style={{color: 'red'}}>Allergies: </Text>
            {patient.patient_allergy?.map((allergy, i) => (
                <Text key={i}>{allergy.name}</Text>
            ))}
            <Text>Email: {patient.email}</Text>
            <Text>Birthdate: {patient.birth_date}</Text>
            <Text>Address: {patient.street}, {patient.city}, {patient.province}</Text>
            <Text>Gender: {{0: 'Not known', 1 : 'Male', 2 : 'Female', 3 : 'Others'}[patient.gender]}</Text>
            <Text>Contact Number: {patient.contact_number}</Text>
            <Text>Profession: {patient.profession}</Text>
            <Button title="Medical History" onPress={() => navigation.navigate('Medical History', {
                id: patient_id
            })}/>
            <Button title="Dental Practitioner" onPress={() => navigation.navigate('Dental Practitioner', {
                id: patient_id
            })}/>
            <Button title="Treatment Plan" onPress={() => navigation.navigate('Treatment Plan', {
                id: patient_id
            })}/>
            <Button title="Dental Procedures" onPress={() => navigation.navigate('Dental Procedures', {
                id: patient_id
            })}/>
            <Button title="Dental Notes" onPress={() => navigation.navigate('Dental Notes', {
                id: patient_id
            })}/>
            <Button title="Prescriptions" onPress={() => navigation.navigate('Prescriptions', {
                id: patient_id
            })}/>
        </HomeView>
    )
}