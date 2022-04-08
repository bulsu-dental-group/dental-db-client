import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { View } from 'react-native'

import { AdultChart } from '../components/AdultChart'
import { PediatricChart } from '../components/PediatricChart'

import { Button } from '../components/StyledComponents'

export function DentalChart({route, navigation}){
    const isFocused = useIsFocused()
    const [selected, setSelected] = useState(Array.from({ length: 32 }, (_, k) => false))
    const [isAdult, setIsAdult] = useState(true)

    function setAdult(newIsAdult){
        if (newIsAdult !== isAdult)
            setSelected(Array.from({ length: 32 }, (_, k) => false))
        setIsAdult(newIsAdult)
    }

    useEffect(() => {
        if (isFocused)
            setSelected(Array.from({ length: 32 }, 
                (_, k) => k in route.params.selectedTeeth ? true : false))
            setIsAdult(route.params.isAdult)
    }, [isFocused])

    return (
        <View style={{
            backgroundColor: 'white'
        }}>
            <View style={{flexDirection: 'row'}}>
                <Button title='Adult' onPress={() => setAdult(true)}/>
                <Button title='Child' onPress={() => setAdult(false)} />
            </View>
            { isAdult ? <AdultChart value={selected} onChange={setSelected} /> :
                <PediatricChart value={selected} onChange={setSelected} />
            }
            <Button title='Select' onPress={() => navigation.navigate({
                name: route.params.goBack,
                params: {
                    selectedTeeth: selected.map((select, i) => select && i).filter((elem, i) => Number.isInteger(elem)),
                    isAdult: isAdult
                },
                merge: true
            })} />
            {/* <Button title='Debug' 
                onPress={() => console.log(selected.map((select, i) => select && i).filter((elem, i) => Number.isInteger(elem)))} /> */}
        </View>
    )
}