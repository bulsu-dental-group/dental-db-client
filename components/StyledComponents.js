import { TextInput, Pressable, Text, View } from "react-native"
import { DefaultTheme } from "@react-navigation/native"

import { styles } from "./Styles"
const water = 'rgb(213, 243, 254)'
const tuftsBlue = 'rgb(60, 153, 220)'
const lapisLazuli = 'rgb(37, 101, 174)'
const mayaBlue = 'rgb(102, 211, 250)'

export function StyledTextInput(props){
    const { style, ...rest} = props

    return (
        <TextInput style={style ? [style, styles.input] : styles.input} {...rest} />
    )
}

export function ListItemView(props){
    const { children, style, ...rest} = props

    return (
        <View style={style? [style, styles.listItemView] : styles.listItemView} {...rest}>
            {children}
        </View>
    )
}

export function ListItemText(props){
    const text = props.children
    const style = props.style

    return (
        <Text style={style ? [style, {color: 'white'}] : {color: 'white'}}>{text}</Text>
    )
}

export function Bold(props){
    const text = props.children

    return (
        <ListItemText style={{fontWeight: 'bold'}}>{text}</ListItemText>
    )
}

export function HomeView(props){
    const { children, style, ...rest} = props

    return (
        <View style={style? [style, styles.homeView] : styles.homeView} {...rest}>
            {children}
        </View>
    )
}

export function Button(props){
    const { title, style, ...rest} = props

    return (
        <Pressable style={style ? [styles.menuBtn, style] : styles.menuBtn} {...rest}>
            <Text style={styles.menuBtnText}>{title}</Text>
        </Pressable>
    )
}

export const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: water,
        card: mayaBlue,
        button: tuftsBlue
    }
}