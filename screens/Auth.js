import { useEffect, useState, useContext } from 'react'
import { Button, View, TextInput } from 'react-native'
import { Controller, useForm } from 'react-hook-form'

import { supabase } from '../supabase'
import ProfileContext from '../components/ProfileContext'

import { LabelTextInput, Label } from '../components/LabelTextInput'

export function Auth({navigation}){
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const [msg, setMsg] = useState()
    const { profile, setProfile } = useContext(ProfileContext)

    async function onLogin(data){
        try {
            const { user, error } = await supabase.auth.signIn({
                email: data.email,
                password: data.password
            })
            if (error)  
                throw error
            else {
                console.log(user)
                const { data, error } = await supabase.from('profile')
                    .select('is_patient')
                    .eq('id', user.id)
                    .single()
                if (error)
                    throw error
                if (data){
                    navigation.navigate('Home')
                } else
                    navigation.navigate('Complete Signup')
                reset()
            }
        } catch (error){
            setMsg(error.message)
        }
    }

    async function onSignUp(data){
        try {
            const { user, error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password
            })
            if (error)
                throw error
            setMsg('An email has been sent to your inbox. Please confirm for verification')
        } catch (error){
            setMsg(error.message)
        } finally {
            reset()
        }
    }

    return ( // Rules, password r
        <View style={{padding: 5}}>
            <LabelTextInput name='email' label='Email' control={control} rules={{required: 'This field is required'}}/>
            <LabelTextInput name='password' label='Password' control={control}
                rules={{required: 'This field is required'}} secureTextEntry={true}/>
            {msg && <Label>{msg}</Label>}
            <Button title="Login" onPress={handleSubmit(onLogin)}/>
            <Button title="Sign-up" onPress={handleSubmit(onSignUp)}/>
        </View>
    )
}