import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { setAddictions } from '../../redux/actions';
import moment from 'moment';
export function HomeScreen({navigation, route}) {

    const [addictions] = useState([]);
    const stateAddictions = useSelector(state => state.app.addictions)
    const dispatch = useDispatch();

    useEffect(() => {
      fetchAddictions()
    }, [stateAddictions]);

    useLayoutEffect(()=> {
        navigation.setOptions(
          {
            // headerRight:()=> <Text style={styles.headerText} onPress={()=> console.log('reset')}  >Reset</Text>,
            headerTitle: 'Soberiety Counter',
            headerTitleStyle: styles.titleText
          }
        )
    })

    const fetchAddictions = async () => {
        const addictionsString = await AsyncStorage.getItem('addictions')
        const savedAddictions = JSON.parse(addictionsString)
        if (savedAddictions) {
            dispatch(setAddictions(savedAddictions));
        }
    }

    const renderAddictions = ({item}) => {
        const totalSeconds =(Date.now()-item.date)/1000
        const seconds= parseInt(totalSeconds % 60);
        const minutes = parseInt(totalSeconds / 60, 10) % 60;
        const hours = parseInt(totalSeconds / (60 * 60), 10) % 24;
        const days= parseInt(totalSeconds / (60 * 60 * 24), 10);
        return (
            <View>
                {days !== 0 && <Text style={styles.bodyText}>{days} days</Text>}
                {hours !== 0 && <Text style={[styles.bodyText, styles.hours]}>{hours} {hours > 1 ? 'hours': 'hour'}</Text>}
                {minutes !== 0 && <Text style={[styles.bodyText, styles.minute]}>{minutes} min</Text>}
                <Text style={styles.bodyText}>{seconds} sec</Text>
            </View>
        )
    }

    return (
        <View style={styles.container} >
            <FlatList data={stateAddictions} renderItem={renderAddictions} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a3f7bf',
        flex: 1,
        alignItems: "center",
        paddingTop: 10
    },
    bodyText: {
        color: '#222831',
        fontSize: 16,
        textAlign: "center",
        marginVertical: 10
    },
    headerText: {
        color: '#222831',
        fontSize: 16,
        marginHorizontal: 3
    },
    titleText: {
        color: '#222831',
        fontSize: 22,
        textAlign: "center",
        fontWeight: 'bold',
    },
    minute: {
        fontSize: 20,
    },
    hours: {
        fontSize: 24,
    },
    days: {
        fontSize: 28,
    }
})