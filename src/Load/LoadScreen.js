import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import {View, Text} from 'react-native'
import config from '../config'
import { useDispatch } from 'react-redux';
import { setAddictions } from '../../redux/actions';

export default function LoadScreen({navigation}) {

    const APP_NAME = 'appName'

    const dispatch = useDispatch();

    useEffect(()=> {
        checkFirstOpen();
    }, [])

    const fetchAddictions = async () => {
        const addictionsString = await AsyncStorage.getItem('addictions')
        const savedAddictions = JSON.parse(addictionsString)
        if (savedAddictions) {
            dispatch(setAddictions(savedAddictions));
            navigation.navigate('Home');
            return;
        }
        navigation.navigate('Create');
    }

    const checkFirstOpen = async () => {
        const check = await AsyncStorage.getItem(config.APP_NAME)
console.log(check);
        if(check){
            fetchAddictions();
            return;
        }
        navigation.navigate('Splash')   
    }

    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}} >
            <Text>Welcome</Text>
        </View>
    )
}