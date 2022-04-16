import { useEffect, useState, useContext } from 'react'
import { View, Button } from 'react-native'
import { Camera } from 'expo-camera'
import { useIsFocused } from '@react-navigation/native'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { Label } from '../components/LabelTextInput'

export function ScanQR({navigation}){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false)
    const { profile } = useContext(ProfileContext)
    const isFocused = useIsFocused()

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    async function handleQRScanned({type, data}){
        try {
            const { error } = await supabase.from('clinic_patient')
                .insert([{
                    'clinic_id' : profile.clinic_id,
                    'patient_id' : data
                }])
            if (error)
                throw error
            setScanned(true)
            navigation.navigate('View Patient', {
                id : data
            })
        } catch (error){
            console.log(error)
        }
    }

    return (
        <View>
            {hasPermission === null && <Label>Requesting for camera permission</Label>}
            {!hasPermission && <Label>No camera access</Label>}
            {isFocused && <Camera
                // barCodeScannerSettings={{
                //     barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                // }}
                onBarCodeScanned={scanned ? undefined : handleQRScanned}
                style={{margin: 10, height: 400}}
            />}
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    )
}