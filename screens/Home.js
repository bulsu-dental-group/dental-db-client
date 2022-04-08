import { useEffect, useState, useContext } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { View } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView,
        DrawerItemList, DrawerItem } from '@react-navigation/drawer'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { Button, HomeView } from '../components/StyledComponents'
import { Label } from '../components/LabelTextInput'

// Screens
import { EditProfile } from './EditProfile'
import { AllPatients } from './AllPatients'

const Drawer = createDrawerNavigator()

export function Home({navigation}){
    const isFocused = useIsFocused()
    const { profile, setProfile } = useContext(ProfileContext)

    async function fetch(){
        const user = supabase.auth.user()
        try {
            console.log(user)
            const { data, error } = await supabase.from('profile')
                    .select('patient_id, clinic_id, is_patient')
                    .eq('id', user.id)
                    .single()
            console.log(data)
            if (data){
                setProfile(data)
            } else {
                navigation.navigate('Complete Signup')
            }
            if (error)
                throw error
        } catch (error){
            console.log(error)
        }
    }

    useEffect(async () => {
        if (isFocused){
            fetch()
        }
    }, [isFocused])

    return (
        <>
            {profile ? (
                <Drawer.Navigator initialRouteName='Home' 
                    drawerContent={(props) => <CustomDrawer {...props} />} >
                        {profile.is_patient ? 
                            <Drawer.Screen name='Home' component={PatientHome} /> :
                            <Drawer.Screen name='Home' component={ClinicHome} />
                        }
                        <Drawer.Screen name='Edit Profile' component={EditProfile} />
                        {!profile.is_patient && <Drawer.Screen name='Registered Patients'
                            component={AllPatients} />}
                </Drawer.Navigator>
            ) : <View></View>}
        </>
    )
}

function CustomDrawer(props){
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label='Sign-out' onPress={async () => await supabase.auth.signOut()} />
        </DrawerContentScrollView>
    )
}

function ClinicHome({navigation}){
    const [clinic, setClinic] = useState({})
    const isFocused = useIsFocused()

    async function fetchClinic(){
        const user = supabase.auth.user()
        try {
            const { data, error } = await supabase.from('clinic')
                .select(`
                    name, 
                    street, 
                    city, 
                    province, 
                    contact_number
                    `)
                .eq('profile_id', user.id)
                .single()
            if (error)
                throw error
            if (data){
                setClinic(data)

            }
            console.log(data)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        if (isFocused)
            fetchClinic()
    }, [isFocused])

    return (
        <HomeView>
            <Label>Welcome, {clinic.name}</Label>
            <Button onPress={() => navigation.navigate('Clinic Patient List')} title="Total Patients"/>
            <Button title="Scan new patient" onPress={() => navigation.navigate('Scan QR')}/>
            <Button title="Patient(s) for recall" />
        </HomeView>
    )
}

function PatientHome({navigation}){
    const [patient, setPatient] = useState({})
    const isFocused = useIsFocused()

    async function fetchPatient(){
        const user = supabase.auth.user()
        try {
            const { data, error } = await supabase.from('patient')
                .select(`
                    id,
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
                    patient_allergy(
                        name
                    )
                `)
                .eq('profile_id', user.id)
                .single()
            console.log(data)
            if (error)
                throw error
            if (data)
                setPatient(data)
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        if (isFocused)
            fetchPatient()
    }, [isFocused])

    return (
        <HomeView>
            <Label>Good day, {patient.first_name}</Label>
            <Button title={'Generate QR Code'} onPress={() => navigation.navigate('QR Code')}/>
            <Button title="Medical History" onPress={() => navigation.navigate('Medical History')}/>
            <Button title="Dental Practitioner" onPress={() => navigation.navigate('Dental Practitioner')}/>
            <Button title="Treatment Plan" onPress={() => navigation.navigate('Treatment Plan')}/>
            <Button title="Dental Procedures" onPress={() => navigation.navigate('Dental Procedures')}/>
            <Button title="Dental Notes" onPress={() => navigation.navigate('Dental Notes')}/>
            <Button title="Prescriptions" onPress={() => navigation.navigate('Prescriptions')}/>
        </HomeView>
    )
}