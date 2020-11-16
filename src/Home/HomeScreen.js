import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAddictions } from '../../redux/actions';
import moment from 'moment';
import { Range } from '../api/medals';
import config from '../config';
export function HomeScreen({ navigation, route }) {
  const [addictions] = useState([]);
  const stateAddictions = useSelector((state) => state.app.addictions);
  const dispatch = useDispatch();
  const rangeChecker = useRef(Range(config.stages));
  useEffect(() => {
    fetchAddictions();
  }, [stateAddictions]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerRight:()=> <Text style={styles.headerText} onPress={()=> console.log('reset')}  >Reset</Text>,
      headerTitle: 'Soberiety Counter',
      headerTitleStyle: styles.titleText,
    });
  });

  const fetchAddictions = async () => {
    const addictionsString = await AsyncStorage.getItem('addictions');
    const savedAddictions = JSON.parse(addictionsString);
    if (savedAddictions) {
      dispatch(setAddictions(savedAddictions));
    }
  };

  const renderAddictions = ({ item }) => {
    const now = new Date();

    const created = new Date();
    created.setMilliseconds(item.date);
    // console.log(now.getMilliseconds() - created.getMilliseconds());

    const diff = new Date();
    diff.setMilliseconds(now.getMilliseconds() - created.getMilliseconds());

    const epoch = new Date('January 1, 1970 00:00:00');

    const seconds = diff.getSeconds() - epoch.getSeconds();
    const minutes = diff.getMinutes() - epoch.getMinutes();
    const hours = diff.getHours() - epoch.getHours();
    const days = diff.getUTCDay() - epoch.getUTCDay();
    // const year = diff.getFullYear() - epoch.getFullYear();
    const medalObject = rangeChecker.current.isInRange(days);

    return (
      <View>
        {medalObject.inRange && (
          <Text style={[styles.bodyText, styles.years]}>
            Medal: {medalObject.metadata.medal}
          </Text>
        )}
        {/* {year !== 0 && <Text style={[styles.bodyText, styles.years]}>{year} {year > 1 ? 'years': 'year'}</Text>} */}
        {days !== 0 && (
          <Text style={[styles.bodyText, styles.days]}>
            {days} {days > 1 ? 'days' : 'day'}
          </Text>
        )}
        {hours !== 0 && days !== 0 && (
          <Text style={[styles.bodyText, styles.hours]}>
            {hours} {hours > 1 ? 'hours' : 'hour'}
          </Text>
        )}
        {minutes !== 0 && hours !== 0 && (
          <Text style={[styles.bodyText, styles.minute]}>{minutes} min</Text>
        )}
        <Text style={styles.bodyText}>{seconds} sec</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={stateAddictions} renderItem={renderAddictions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a3f7bf',
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  bodyText: {
    color: '#222831',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  headerText: {
    color: '#222831',
    fontSize: 16,
    marginHorizontal: 3,
  },
  titleText: {
    color: '#222831',
    fontSize: 22,
    textAlign: 'center',
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
  },
  years: {
    fontSize: 32,
  },
});
