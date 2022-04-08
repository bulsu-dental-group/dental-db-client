import { useEffect, useState, useContext } from 'react'
import { View } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { Button } from '../components/StyledComponents'
import { Label } from '../components/LabelTextInput'

export function ScanQR({navigation}){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false)
    const { profile } = useContext(ProfileContext)

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    async function handleQRScanned({type, data}){
        try {
            const { error } = await supabase.from('clinic_profile')
                .insert([{
                    'clinic_id' : profile.clinic_id,
                    'patient_id' : data,
                    'last_visit' : new Date()
                }])
            if (error)
                throw error
            navigation.navigate('View Patient', {
                id : data
            })
        } catch (error){
            console.log(error)
        }
    }

    return (
        <View>
            <Label>Scan new patient</Label>
            {hasPermission === null && <Label>Requesting for camera permission</Label>}
            {!hasPermission && <Label>No camera access</Label>}
            <BarCodeScanner 
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeScanned={scanned ? undefined : handleQRScanned} 
                style={{height: 500, paddingTop: 10}}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    )
}