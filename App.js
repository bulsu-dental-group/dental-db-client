import 'react-native-gesture-handler'
import 'react-native-url-polyfill/auto'
import { useEffect, useState } from 'react'
import { StyleSheet, View, LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { supabase } from './supabase'
import ProfileContext from './components/ProfileContext'

import { Auth } from './screens/Auth'
import { CompleteSignup } from './screens/CompleteSignup'
import { Home } from './screens/Home'
import { ClinicPatientList } from './screens/ClinicPatientList'
import { ViewPatient } from './screens/ViewPatient'
import { ScanQR } from './screens/ScanQR'
import { QRCode } from './screens/QRCode'
import { DentalNotes } from './screens/DentalNotes'
import { DentalProcedures } from './screens/DentalProcedures'
import { EditProcedure } from './screens/EditProcedure'
import { DentalPractitioner } from './screens/DentalPractitioner'
import { MedicalHistory } from './screens/MedicalHistory'
import { Prescriptions} from './screens/Prescriptions'
import { TreatmentPlans } from './screens/TreatmentPlans' 
import { DentalChart } from './screens/DentalChart'

import { Theme } from './components/StyledComponents'

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const Stack = createNativeStackNavigator()

export default function App() {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    // supabase.auth.signOut()
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View style={styles.container}>
      <ProfileContext.Provider value={{profile, setProfile}}>
        <NavigationContainer theme={Theme}>
          <Stack.Navigator initialRouteName={'Home'} >
            {session ? (
              <>
                <Stack.Screen name='Home' options={{headerShown: false, hidden: true}} component={Home} />
                <Stack.Screen name='Complete Signup' component={CompleteSignup} />
                <Stack.Screen name='Scan QR' component={ScanQR} />
                <Stack.Screen name='View Patient' component={ViewPatient} />
                <Stack.Screen name='Clinic Patient List' component={ClinicPatientList} />
                <Stack.Screen name='Dental Notes' component={DentalNotes} />
                <Stack.Screen name='Dental Procedures' component={DentalProcedures} />
                <Stack.Screen name='Edit Procedure' component={EditProcedure} />
                <Stack.Screen name='Dental Chart' component={DentalChart} />
                <Stack.Screen name='Dental Practitioner' component={DentalPractitioner} />
                <Stack.Screen name='Medical History' component={MedicalHistory} />
                <Stack.Screen name='Prescriptions' component={Prescriptions} />
                <Stack.Screen name='Treatment Plan' component={TreatmentPlans} />
                <Stack.Screen name='QR Code' component={QRCode} />
              </>
            ): (
              <>
              <Stack.Screen name='Auth' component={Auth}/> 
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ProfileContext.Provider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6f738a',
    justifyContent: 'center',
  },
})
