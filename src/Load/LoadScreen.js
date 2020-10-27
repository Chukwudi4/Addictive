import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';

export default function LoadScreen({navigation}) {

    const APP_NAME = 'appName'

    useEffect(()=> {

    })

    const checkFirstOpen = async () => {
        const check = await AsyncStorage.getItem(APP_NAME)

        if(check){
            navigation.navigate('Welcome')
            return;
        }
        navigation.navigate('Splash')   
    }

    return <View/>
}