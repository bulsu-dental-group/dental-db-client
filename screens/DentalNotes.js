import { useEffect, useState, useContext } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { ScrollView, View, Text } from 'react-native'
import { useForm, useFieldArray } from 'react-hook-form'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { Label, LabelTextInput } from '../components/LabelTextInput'
import { Button, ListItemView, ListItemText } from '../components/StyledComponents'

const pediatricNumber = [
    'UpperLeft A', 'UpperLeft B', 'UpperLeft C', 'UpperLeft D', 'UpperLeft E',
    'UpperRight E', 'UpperRight D', 'UpperRight C', 'UpperRight B', 'UpperRight A',
    'LowerRight A', 'LowerRight B', 'LowerRight C', 'LowerRight D', 'LowerRight E',
    'LowerLeft E', 'LowerLeft D', 'LowerLeft C', 'LowerLeft B', 'LowerLeft A'
]

export function DentalNotes({route, navigation}){
    const isFocused = useIsFocused()
    const { profile } = useContext(ProfileContext)
    const [notes, setNotes] = useState([])
    const { register, setValue, control, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            selected_teeth: [],
            is_adult: true
        }
    })
    const isAdult = watch('is_adult')
    const selectedTeeth = watch('selected_teeth')

    const { fields, append, remove } = useFieldArray({
        name: 'procedures',
        control: control
    })
    
    async function fetch(){
        if (profile.is_patient){
            await fetchNotes(profile.patient_id)
            await fetchIsAdult(profile.patient_id)
        } else {
            await fetchNotes(route.params.id)
            await fetchIsAdult(route.params.id)
        }
    }

    async function fetchIsAdult(id){
        try {
            const { data, error } = await supabase.from('clinic_patient')
                .select('is_adult')
                .eq('patient_id', id)
                .single()
            if (error)
                throw error
            if (route.params.goBack)
                setValue('is_adult', data.is_adult === true)
        } catch (error){
            throw error
        }
    }

    async function fetchNotes(id){
        try {
            const user = supabase.auth.user()
            const { data, error } = await supabase.from('dental_note')
                .select(`
                    id,
                    note,
                    visited_at,
                    procedure (
                        id,
                        name
                    ),
                    note_tooth (
                        number
                    )
                `)
                .eq('patient_id', id)
            if (error)
                throw error
            if (data)
                setNotes(data)
        } catch (error){
            console.log(error)
        }
    }

    async function deleteNote(i){
        try {
            const { error : deleteNoteToothErr } = await supabase.from('note_tooth')
                .delete()
                .eq('note_id', notes[i].id)
            if (deleteNoteToothErr)
                throw deleteNoteToothErr
            
            if (notes[i].procedure?.length > 0){
                const { error : deleteProcToothErr } = await supabase.from('procedure_tooth')
                    .delete()
                    .in('procedure_id', notes[i].procedure.map((proc) => proc.id))
                if (deleteProcToothErr)
                    throw deleteProcToothErr
            }
            
            const { error : deleteNoteProcErr } = await supabase.from('note_procedure')
                .delete()
                .eq('note_id', notes[i].id)
            if (deleteNoteProcErr)
                throw deleteNoteProcErr

            const { error : deleteProcErr } = await supabase.from('procedure')
                .delete()
                .in('id', notes[i].procedure.map((proc) => proc.id))
            if (deleteProcErr)
                throw deleteProcErr
        
            const { error } = await supabase.from('dental_note')
                .delete()
                .eq('id', notes[i].id)
            if (error)
                throw error
            else 
                setNotes(notes.filter((_, k) => i !== k))
        } catch (error){
            console.log(error)
        }
    }

    async function addNote(form){
        try {
            const { data : note, error : noteErr } = await supabase.from('dental_note')
                .insert([{
                    'note' : form.note,
                    'patient_id' : route.params.id
                }])
                .single()
            if (noteErr)
                throw noteErr
            
            const { data : procedures, error : procedureErr } = await supabase.from('procedure')
                .insert(form.procedures.map((procedure, _) => ({
                    name: procedure.name,
                    patient_id: route.params.id
                })))
            if (procedureErr)
                throw procedureErr

            const { error : noteProcErr } = await supabase.from('note_procedure')
                .insert(procedures.map((procedure, _) => ({
                    note_id : note.id,
                    procedure_id : procedure.id
                })))
            
            if (form.selected_teeth.length > 0) {
                for (const procedure of procedures){
                    const { data : procedureTeeth, error : procTeethErr } = await supabase.from('procedure_tooth')
                        .insert(form.selected_teeth.map((number, _) => ({
                            procedure_id : procedure.id,
                            number: number
                        })))
                    if (procTeethErr)
                        throw procTeethErr
                }
            } else 
                procedures.reduce((procedure, _) => ({...procedure, procedure_tooth: []}))
            
            const { data : noteTeeth, error : noteTeethErr } = await supabase.from('note_tooth')
                .insert(form.selected_teeth.map((number, _) => ({
                    note_id: note.id,
                    number: number
                })))
            if (noteTeethErr)
                throw noteTeethErr

            const { error : isAdultErr } = await supabase.from('clinic_patient')
                .update('is_adult', form.is_adult)
                .match({
                    'patient_id': route.params.id,
                    'clinic_id' : profile.clinic_id
                })
            if (isAdultErr)
                throw isAdultErr

            setNotes([...notes, {
                ...note,
                procedure: procedures,
                note_tooth: noteTeeth
            }])
            reset()
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        if (isFocused)
            fetch()
    }, [isFocused])

    useEffect(() => {
        if (route.params?.selectedTeeth){
            console.log(route.params)
            setValue('selected_teeth', route.params.selectedTeeth)
            setValue('is_adult', route.params.isAdult)
        }
    }, [route.params?.selectedTeeth])

    return ( // Styling on Dental notes
        <ScrollView> 
            {notes.map((note, i) => (
                <ListItemView key={i}>
                    <View>
                        <ListItemText>Note: {note.note}</ListItemText>
                        <ListItemText>Last visit: 
                            {(new Date(Date.parse(note.visited_at))).toLocaleDateString()}</ListItemText>
                        <>
                            { note.procedure?.length > 0 && <ListItemText>Procedures: {
                                note.procedure.map((item, _) => item.name).join(', ')
                            } </ListItemText>}
                        </>
                        <>
                            { note.note_tooth?.length > 0 && <ListItemText>Selected Teeth: {
                                isAdult ? 
                                note.note_tooth.map((item, _) => (item.number + 1).toString()).join(', ') :
                                note.note_tooth.map((item, _) => pediatricNumber[item.number]).join(', ')
                            } </ListItemText>}
                        </>
                    </View> 
                    
                    { !profile.is_patient && <Button onPress={() => deleteNote(i)} title='Delete' />}
                </ListItemView>
            ))}
            {profile.is_patient == false && (
                <View>
                    <LabelTextInput name='note' label='Dental Note' control={control}/>
                    { fields.map((field, i) => (
                        <View key={i}>
                            <Label>Procedures</Label>
                            <LabelTextInput name={`procedures[${i}].name`} control={control}
                                rules={{required: 'Empty procedure name not valid'}} />
                            <Button title='Delete' onPress={() => remove(i)} />
                        </View>
                    ))}
                    <Button title='Add procedure' onPress={() => append({name: ''})} />
                    <View>
                        <Label>Selected teeth: {
                            isAdult ? selectedTeeth.map((tooth, i) => (tooth + 1).toString()).join(', ') :
                                selectedTeeth.map((tooth, i) => pediatricNumber[tooth]).join(', ')
                        } </Label>
                        <Button title='Select teeth' onPress={() => navigation.navigate('Dental Chart', {
                            isAdult: isAdult,
                            selectedTeeth: selectedTeeth,
                            goBack: 'Dental Notes'
                        })} />
                    </View>
                    <Button title='Add dental note' onPress={handleSubmit(addNote)} />
                </View>
            )}
        </ScrollView>
    )
}