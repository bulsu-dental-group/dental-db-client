import { useEffect, useState, useContext, useCallback } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { ScrollView, View, RefreshControl } from 'react-native'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { Button, ListItemView, ListItemText, Bold } from '../components/StyledComponents'

const pediatricNumber = [
    'UpperLeft A', 'UpperLeft B', 'UpperLeft C', 'UpperLeft D', 'UpperLeft E',
    'UpperRight E', 'UpperRight D', 'UpperRight C', 'UpperRight B', 'UpperRight A',
    'LowerRight A', 'LowerRight B', 'LowerRight C', 'LowerRight D', 'LowerRight E',
    'LowerLeft E', 'LowerLeft D', 'LowerLeft C', 'LowerLeft B', 'LowerLeft A'
]

export function DentalProcedures({route, navigation}){
    const isFocused = useIsFocused()
    const { profile } = useContext(ProfileContext)
    const [procedures, setProcedures] = useState([])
    const [isAdult, setIsAdult] = useState(true)

    async function fetch(){
        if (profile.is_patient){
            await fetchProcedures(profile.patient_id)
            await fetchIsAdult(profile.patient_id)
        } else {
            await fetchProcedures(route.params.id)
            await fetchIsAdult(route.params.id)
        }
    }

    async function fetchIsAdult(id){
        try {
            const { data, error } = await supabase.from('clinic_patient')
                .select('is_adult')
                .eq('patient_id', id)
                .limit(1)
            if (error)
                throw error
            setIsAdult(data[0].is_adult)
        } catch (error){
            throw error
        }
    }

    async function fetchProcedures(id){
        try {
            const { data, error } = await supabase.from('procedure')
                .select(`
                    id,
                    name,
                    procedure_material (
                        name
                    ),
                    procedure_tooth (
                        number
                    ),
                    created_at
                `)
                .eq('patient_id', id)
            if (error)
                throw error
            setProcedures(data)
            // console.log(data)
        } catch (error){
            console.log(error)
        }
    }

    async function deleteProcedure(i){
        try {
            const { error : toothErr } = await supabase.from('procedure_tooth')
                .delete()
                .eq('procedure_id', procedures[i].id)
            if (toothErr)
                throw toothErr

            const { error : materialErr } = await supabase.from('procedure_material')
                .delete()
                .eq('procedure_id', procedures[i].id)
            if (materialErr)
                throw materialErr

            const { error : noteProcErr } = await supabase.from('note_procedure')
                .delete()
                .eq('procedure_id', procedures[i].id)
            if (noteProcErr)
                throw noteProcErr

            const { error : treatProcErr } = await supabase.from('treatment_plan_procedure')
                .delete()
                .eq('procedure_id', procedures[i].id)
            if (treatProcErr)
                throw treatProcErr

            const { error } = await supabase.from('procedure')
                .delete()
                .eq('id', procedures[i].id)
            if (error)
                throw error
                
            setProcedures(procedures.filter((_, k) => i !== k))
        } catch (error){
            console.log(error)
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
            {procedures.map((procedure, i) => (
                <ListItemView key={i} >
                    <View style={{flex: 5}}>
                        <ListItemText><Bold>Name: </Bold>
                            {procedure.name}</ListItemText>
                        {procedure.procedure_material.length > 0 && <>
                            <Bold>Procedure materials: </Bold>
                            {procedure.procedure_material.map((material, j) =>(
                                <ListItemText key={j}>{material.name}</ListItemText>
                            ))}
                        </>}
                        {procedure.procedure_tooth.length > 0 && 
                            <ListItemText>
                                <Bold>Selected teeth: </Bold>
                                { isAdult ? procedure.procedure_tooth.map(tooth => tooth.number + 1).join(', ') :
                                    procedure.procedure_tooth.map(tooth => pediatricNumber[tooth.number]).join(', ')
                                }
                            </ListItemText>
                        }
                        <ListItemText><Bold>Created at: </Bold>{procedure.created_at}</ListItemText>
                    </View>
                    {!profile.is_patient && <>
                        <Button onPress={() => navigation.navigate('Edit Procedure', {
                            procedure_id: procedure.id,
                            isAdult: isAdult
                        })} title='Edit' style={{flex: 1}}/>
                        <Button onPress={() => deleteProcedure(i)} title='Delete' style={{flex: 1}}/>
                    </>}
                </ListItemView>    
            ))}
        </ScrollView>
    )
}