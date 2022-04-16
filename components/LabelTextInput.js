import { Controller } from 'react-hook-form'
import { View, Text, TextInput,  } from 'react-native'
import { styles } from './Styles'

export function LabelTextInput({name, label, control, rules, style, ...props}){
  

  return (
    <View style={styles.container}>
      {label && <Label>{label}</Label>}
      <Controller name={name} control={control} render={({field, fieldState}) => (
        <>
          <TextInput style={style ? 
              [style, styles.input, { borderColor: fieldState.error ? '#fc6d47' : '#c0cbd3' }]: 
              [styles.input, { borderColor: fieldState.error ? '#fc6d47' : '#c0cbd3' }]}
            onChangeText={text => field.onChange(text)} {...props}
            value={field.value}
            />
          {fieldState.error && <Text>{fieldState.error.message}</Text>}
        </>
      )} 
        rules={rules}
      />
    </View>
  )
}

export function Label(props){
  const text = props.children
  const style = props.style

  return (
    <Text style={style ? [styles.label, style] : styles.label}>{text}</Text>
  )
}


  