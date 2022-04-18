import { StyleSheet } from "react-native";

// Blue
export const tuftsBlue = '#3C99DC'
export const mayaBlue = '#66D3FA'
export const water = '#D5F3FE'
export const lapisLazuli = '#2565AE'
export const crayolaPeriwinkle = '#C7D4F0'

export const styles = StyleSheet.create({
    container: {
      marginVertical: 5,
    },
    input: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 5,
      paddingVertical: 5,
      paddingLeft: 5,
      fontSize: 16,
      height: 40
    },
    label: {
      paddingVertical: 5,
      fontSize: 16,
      fontWeight: 'bold',
    },
    textError: {
      color: '#fc6d47',
      fontSize: 14,
    },
    menuBtn : {
      backgroundColor: tuftsBlue,
      margin: 5,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
    },
    menuBtnText : {
      color: 'white',
      fontWeight: 'bold'
    },
    listItemView: {
      backgroundColor: lapisLazuli,
      margin: 5,
      borderRadius: 5,
      padding: 5,
      flexDirection: 'row'
    },
    homeView : {
      backgroundColor: crayolaPeriwinkle,
      marginHorizontal: 10,
      marginTop: 20,
      borderRadius: 5,
      padding: 10,
    }
  });