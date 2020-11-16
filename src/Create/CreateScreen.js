import AsyncStorage from '@react-native-community/async-storage';
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { widthPercentageToDP as w } from 'react-native-responsive-screen';
import UUIDGenerator from 'react-native-uuid-generator';
import { useDispatch } from 'react-redux';
import { addAddictions } from '../../redux/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export function CreateScreen({ navigation, route }) {
  const [selected, setSelected] = useState(0);
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const items = [
    'Alcohol',
    'Pornography and Masturbation',
    'Substance Use',
    'Social Media',
    'Marijuana',
  ];
  const addictions = route.params?.addictions ?? [];
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          style={{
            fontSize: w(3.5),
            marginHorizontal: w(2),
            color: '#fff',
            fontWeight: 'bold',
          }}
          onPress={save}>
          Done
        </Text>
      ),
      headerTitle: '',
      // headerTitle: () => <Text onPress={() => setShowDate(true)} >{date ? moment().format("dddd, MMMM Do YYYY"): 'Select date'}</Text>
    });
  });

  const save = async () => {
    if (!date) {
      Alert.alert('You have not selected date');
      return;
    }
    const id = await UUIDGenerator.getRandomUUID();

    const data = {
      title: items[selected],
      date: date.getTime(),
      id,
    };

    addictions.push(data);
    dispatch(addAddictions(data));
    const addictionsString = JSON.stringify(addictions);
    AsyncStorage.setItem('addictions', addictionsString);
    navigation.navigate('Home');
  };

  const renderItems = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            { backgroundColor: index === selected ? '#3b5998' : '#4c669f' },
          ]}
          onPress={() => {
            setSelected(index);
            console.log(index);
          }}>
          <Text style={styles.buttonText}>{item}</Text>
        </TouchableOpacity>
      </>
    );
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(currentDate);
    console.log(new Date());
    return;
    setShowDate(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      {showDate && (
        <DateTimePicker
          minimumDate={new Date()}
          value={new Date()}
          mode="date"
          onChange={onChange}
        />
      )}
      <FlatList
        keyExtractor={(item) => item}
        data={items}
        renderItem={renderItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: w(5),
    backgroundColor: '#4c669f',
  },
  container: {
    backgroundColor: '#4c669f',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: w(5),
    fontWeight: 'bold',
  },
});
