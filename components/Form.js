import { useEffect, useState } from 'react' 
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';

import { Label, LabelTextInput } from './LabelTextInput'
import RNPickerSelect from 'react-native-picker-select'
import DateTimePicker from '@react-native-community/datetimepicker'
import { View, Button} from 'react-native'
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button'

export function Form({isPatient, isEdit}){
    const { control, watch } = useFormContext()
    const [showDate, setShowDate] = useState(false)
    const { fields : allergies, append : allergy_append, remove : allergy_remove } = useFieldArray({name: 'allergies'})
    const { fields : dentists, append : dentist_append, remove : dentist_remove } = useFieldArray({name: 'dentists'})
    const birthDate = watch('birth_date')

    useEffect(() => {
        dentist_append({first_name: '', last_name: '', pcr_id: ''})
    }, [dentist_append])

    return (
        <View>
        { isPatient ? (
            <>
                <LabelTextInput name='first_name' label='First name' control={control} />
                <LabelTextInput name='last_name' label='Last name' control={control} />
            </>
        ) : <LabelTextInput name='name' label='Clinic name' control={control} /> }
        { isPatient && 
            <>
                <LabelTextInput name='age' label='Age' control={control} keyboardType='numeric' rules={{
                    pattern: {
                        value: /\d\d?/,
                        message: 'Valid age required'
                    }
                }} />
                <Label>Gender</Label>
                <Controller control={control} render={({ field: {onChange, ...props} }) => (
                    <RNPickerSelect {...props} onValueChange={(value) => onChange(value)}
                    style={{ inputAndroid: { color: 'black' } }}
                    items={[
                        { label: 'Male', value: 1 },
                        { label: 'Female', value: 2},
                        { label: 'Others', value: 3},
                        { label: 'Not known', value: 0}
                    ]} />
                )} name='gender'/>
                <Label>Birthdate</Label>
                {birthDate && <Label>{birthDate.toLocaleDateString()}</Label>}
                {showDate && <Controller control={control} render={({ field: {onChange, value}}) => (
                    <DateTimePicker mode='date' value={value} onChange={(event, date) => {
                        setShowDate(false)
                        onChange(date)
                    }} />
                )} name="birth_date" />}
                <Button title='Change date' onPress={() => setShowDate(true)} />
            </> }
        <LabelTextInput name='contact_number' label='Contact number' control={control} keyboardType='numeric'
            rules={{pattern: {value: /[0-9]+/, message: 'Numeric only'}}}/>
        <Label>Address</Label>
        <LabelTextInput name='street' label='Street (and Barangay/Avenue if applicable)' control={control} rules={{required: true}}/>
        <LabelTextInput name='city' label='City' control={control} rules={{required: true}}/>
        <LabelTextInput name='province' label='Province' control={control} rules={{required: true}}/>
        { isPatient && <LabelTextInput name='profession' label='Profession' control={control} /> }
        { isPatient ? (
            <>
                <Label>Allergies</Label>
                {allergies.map((allergy, i) => (
                    <View key={i} style={{flexDirection: 'row'}}>
                        <LabelTextInput name={`allergies[${i}].name`} control={control} rules={{required: true}}/>
                        <Button title='Delete' onPress={() => allergy_remove(i)} />
                    </View>
                ))}
                <Button title='Add allergy' onPress={() => allergy_append({name: ''})} />
            </>
        ) : (
            !isEdit && <>
                <Label>Dental Practitioners</Label>
                {dentists.map((dentist, i) => (
                    <View key={i} style={{flexDirection: 'row'}}>
                        <LabelTextInput name={`dentists[${i}].first_name`} label='First Name'
                            control={control} rules={{required: true}} />
                        <LabelTextInput name={`dentists[${i}].last_name`} label='Last Name'
                            control={control} rules={{required: true}} />
                        <LabelTextInput name={`dentists[${i}].prc_id`} label='PRC ID'
                            control={control} rules={{required: true}} />
                        <Button title='Delete' onPress={() => dentist_remove(i)} />
                    </View>
                ))}
                <Button title='Add' onPress={() => dentist_append({first_name: '', last_name: '', pcr_id: ''})} />
            </>
        )}
    </View>
    )
}