import { useEffect, useState, useContext } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { ScrollView, View } from 'react-native'
import { useForm, useFieldArray } from 'react-hook-form'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { Label, LabelTextInput} from '../components/LabelTextInput'
import { Button } from '../components/StyledComponents'

const pediatricNumber = [
    'UpperLeft A', 'UpperLeft B', 'UpperLeft C', 'UpperLeft D', 'UpperLeft E',
    'UpperRight E', 'UpperRight D', 'UpperRight C', 'UpperRight B', 'UpperRight A',
    'LowerRight A', 'LowerRight B', 'LowerRight C', 'LowerRight D', 'LowerRight E',
    'LowerLeft E', 'LowerLeft D', 'LowerLeft C', 'LowerLeft B', 'LowerLeft A'
]

export function EditProcedure({route, navigation}){
    const isFocused = useIsFocused()
    const { profile } = useContext(ProfileContext)
    const { control, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            name: '',
            materials: [],
            selectedTeeth: [],
            isAdult: true
        }
    })
    const { fields : materials, append, remove} = useFieldArray({name: 'materials', control: control})
    const selectedTeeth = watch('selectedTeeth')
    const isAdult = watch('isAdult')

    async function fetchProcedure(id){
        try {
            const { data, error } = await supabase.from('procedure')
                .select(`
                    name,
                    procedure_material (
                        name
                    ),
                    procedure_tooth (
                        number
                    )
                `)
                .eq('id', id)
                .single()
            if (error)
                throw error

            setValue('name', data.name)
            data.procedure_material.forEach((material) => {
                append({name: material.name})
            })
            setValue('selectedTeeth', data.procedure_tooth.map((tooth) => tooth.number))
            setValue('isAdult', route.params.isAdult)
        } catch (error){
            console.log(error)
        }
    }

    async function updateProcedure(form){
        const procedure_id = route.params.procedure_id
        try {
            const { error : deleteProcTeethErr } = await supabase.from('procedure_tooth')
                .delete()
                .eq('procedure_id', procedure_id)
            if (deleteProcTeethErr)
                throw deleteProcTeethErr

            const { error : deleteProcMaterialErr } = await supabase.from('procedure_material')
                .delete()
                .eq('procedure_id', procedure_id)
            if (deleteProcMaterialErr)
                throw deleteProcMaterialErr

            const { data :procedure, error : updateProcErr } = await supabase.from('procedure')
                .update({name: form.name})
                .eq('id', procedure_id)
                .single()
            if (updateProcErr)
                throw updateProcErr

            const { error : updateProcTeethErr } = await supabase.from('procedure_tooth')
                .insert(form.selectedTeeth.map((tooth) => ({
                    number: tooth,
                    procedure_id: procedure_id
                })))
            if (updateProcTeethErr)
                throw updateProcTeethErr

            const { error : updateProcMaterialErr } = await supabase.from('procedure_material')
                .insert(form.materials.map((material) => ({
                    name : material.name,
                    procedure_id : procedure_id
                })))
            if (updateProcMaterialErr)
                throw updateProcMaterialErr

            navigation.navigate('Dental Procedures', {
                id: procedure.patient_id
            })
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        if (isFocused){
            if (route.params?.selectedTeeth){
                setValue('selectedTeeth', route.params.selectedTeeth)
                setValue('isAdult', route.params.isAdult)
            } else
                fetchProcedure(route.params.procedure_id)
        }
    }, [isFocused])

    return (
        <ScrollView>
            <LabelTextInput name='name' label='Procedure Name' control={control} />
            <Label>Procedure Materials</Label>
            {materials.map((material, i) => (
                <View key={i}>
                    <LabelTextInput name={`materials[${i}].name`} label='Material name' 
                        control={control} />
                    <Button title='Delete' onPress={() => remove(i)} />
                </View>
            ))}
            <Button title='Add material' onPress={() => append({name: ''})} />
            <Label>Selected teeth: {
                isAdult ? selectedTeeth.map((tooth, i) => (tooth + 1).toString()).join(', ') :
                    selectedTeeth.map((tooth, i) => pediatricNumber[tooth]).join(', ')
            }</Label>
            <Button title='Select teeth' onPress={() => navigation.navigate('Dental Chart', {
                    isAdult: isAdult,
                    selectedTeeth: selectedTeeth,
                    goBack: 'Edit Procedure'
                })} />
            <Button title='Update' onPress={handleSubmit(updateProcedure)} />
        </ScrollView>
    )
}