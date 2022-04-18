import { useEffect, useState, useContext, useCallback } from 'react'
import { Button, RefreshControl, Text, ScrollView } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'
import { HomeView } from '../components/StyledComponents'
import { Label } from '../components/LabelTextInput'

export function DentalPractitioner({route, navigation}){
    const { profile } = useContext(ProfileContext)
    const isFocused = useIsFocused()
    const [assigned, setAssigned] = useState([])
    const [practitioners, setPractitioners] = useState([])
    const [pickPractitioner, setPickPractitioner] = useState({})

    async function fetchAssigned(patient_id){
        try {
            const { data, error } = await supabase.from('clinic_patient')
                .select(`
                    clinic (
                        name
                    ),
                    dental_practitioner (
                        id,
                        first_name,
                        last_name,
                        prc_id
                    )
                `)
                .eq('patient_id', patient_id)
            if (error)
                throw error
            console.log(data)
            if (data)
                setAssigned(data.map((a) => ({...a.clinic, dental_practitioner: a.dental_practitioner})))
        } catch (error){
            console.log(error)
        }
    }

    async function fetchPractitioners(){
        try {
            const { data, error } = await supabase.from('dental_practitioner')
                .select(`
                    id,
                    first_name,
                    last_name,
                    prc_id
                `)
                .eq('clinic_id', profile.clinic_id)
            if (error)
                throw error
            if (data)
                setPractitioners(data)
        } catch (error){
            console.log(error)
        }
    }

    async function updateAssigned(){
        try {
            const { data, error } = await supabase.from('clinic_patient')
                .update({dental_practitioner_id : pickPractitioner.id})
                .match({
                    clinic_id: profile.clinic_id,
                    patient_id: route.params.id
                })
                .single()
            if (error)
                throw error
            if (data)
                setAssigned([{dental_practitioner: pickPractitioner, name: assigned[0].name}])
        } catch (error){
            console.log(error)
        }
    }

    async function fetch(){
        if (profile.is_patient)
            fetchAssigned(profile.patient_id)
        else {
            fetchAssigned(route.params.id)
            fetchPractitioners()
            setPickPractitioner({...assigned})
        }
    }

    useEffect(() => {
        if (isFocused)
            fetch()
    }, [isFocused])

    const [refreshing, setRefreshing] = useState(false)
    
    const onRefresh = useCallback(() => {
        setRefreshing(true)
        fetch().then(() => setRefreshing(false))
    }, [])

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {assigned ? (
                <>
                    {assigned.map((a, i) => (
                        <HomeView key={i}>
                            {a.dental_practitioner ? (<>
                                <Text>Name: {a.dental_practitioner.first_name} {a.dental_practitioner.last_name}</Text>
                                <Text>PRC ID: {a.dental_practitioner.prc_id}</Text>
                            </>) :
                            <Text>No assigned dental practitioner from this clinic yet</Text>}
                            <Text>Clinic: {a.name}</Text>
                        </HomeView>
                    ))}
                </>
            ) : <Text>No assigned dental practitioner yet</Text> }
            {!profile.is_patient && (
                <HomeView>
                    <Text>Change assigned dental practitioner</Text>
                    <RNPickerSelect value={pickPractitioner}
                        onValueChange={(item, i) => setPickPractitioner(item)}
                        style={{ inputAndroid: { color: 'black' } }}
                        items={practitioners.map((practitioner, i) => ({
                            label: `${practitioner.first_name} ${practitioner.last_name}`,
                            value: practitioner
                        }))} />
                    <Button title='Update' onPress={updateAssigned} />
                </HomeView>
            )}
        </ScrollView>
    )
}