import { useContext } from 'react'
import { View } from 'react-native'
import SvgQRCode from 'react-native-qrcode-svg'

import ProfileContext from '../components/ProfileContext'

export function QRCode({route, navigation}){
    const { profile } = useContext(ProfileContext)

    return (
        <View style={{
            margin: 10
        }}>
            <SvgQRCode value={profile.patient_id}/>
        </View>
    )
}
