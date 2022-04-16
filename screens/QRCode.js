import { useContext } from 'react'
import { View, useWindowDimensions } from 'react-native'
import SvgQRCode from 'react-native-qrcode-svg'

import ProfileContext from '../components/ProfileContext'

export function QRCode({route, navigation}){
    const { profile } = useContext(ProfileContext)
    const window = useWindowDimensions()

    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        }}>
            <SvgQRCode size={window.width * 0.8}
            value={profile.patient_id} />

        </View>
    )
}
