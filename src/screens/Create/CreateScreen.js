import AsyncStorage from '@react-native-community/async-storage';
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { widthPercentageToDP as w } from 'react-native-responsive-screen';
import UUIDGenerator from 'react-native-uuid-generator';
import { useDispatch, useSelector } from 'react-redux';
import { addAddictions, setAddictions } from '../../../redux/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colorSet } from '../../appStyles';
import { Icon } from 'react-native-elements';
import { saveAddictionsOnDB } from '../../api/storage';

export function CreateScreen({ navigation, route }) {
  const addictionData = [
    { title: 'Smoking', metaData: '' },
    { title: 'Alcohol', metaData: '' },
    { title: 'Pornography and Masturbation', metaData: '' },
    {
      title: 'Substance Use',
      metaData: 'e.g Heroin, Lean, Crack and other hard drugs',
    },
    { title: 'Social Media', metaData: '' },
    { title: 'Sex' },
    {
      title: 'Junk food',
      metaData: 'e.g Soda, Burgers and other processed food',
    },
  ];

  const [selected, setSelected] = useState(-1);
  const [data] = useState(addictionData);
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const savedAddictions = useSelector((state) => state.app.addictions);
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={save}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: w(3),
            marginRight: w(2),
          }}>
          <Icon
            name="edit-2"
            type="feather"
            size={w(4)}
            color={colorSet.foregroundColor}
          />
          <Text
            style={{
              color: colorSet.foregroundColor,
              fontSize: w(3),
              marginHorizontal: w(1),
            }}>
            Personalise yours
          </Text>
        </TouchableOpacity>
      ),
    });
  });

  const save = async () => {
    if (!date) {
      Alert.alert('You have not selected date');
      return;
    }
    navigation.navigate('Custom');
  };

  const proceedToHome = async () => {
    const id = await UUIDGenerator.getRandomUUID();

    const data = {
      title: addictionData[selected].title,
      date: date.getTime(),
      id,
    };

    console.log(savedAddictions);
    const tempAddictions = savedAddictions;

    tempAddictions.push(data);
    dispatch(setAddictions(tempAddictions));
    const addictionsString = JSON.stringify(tempAddictions);
    AsyncStorage.setItem('addictions', addictionsString);
    saveAddictionsOnDB(user.uid, tempAddictions);
    navigation.navigate('Tab', { screen: 'Home' });
  };

  const onSelect = async () => {
    Alert.alert(
      'Confirmation',
      `Are you sure you want to proceed with your selection? `,
      [
        { text: 'No, Cancel', onPress: () => console.log('ok') },
        { text: 'Yes', onPress: () => proceedToHome() },
      ],
      { cancelable: false },
    );
  };

  const renderItems = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              backgroundColor:
                index === selected
                  ? 'rgba(128, 128, 0, 0.23)'
                  : colorSet.mainBackgroundColor,
            },
          ]}
          onPress={() => {
            setSelected(index);
            onSelect();
          }}>
          <Text
            style={[
              styles.title,
              // { color: index === selected ? '#fff' : '#6F6F6F' },
            ]}>
            {item.title} {item.metaData}
          </Text>
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
      <Text style={styles.title}>What habit are you trying to stop?</Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <Text style={[styles.subTitle, { marginRight: w(1) }]}>Select one</Text>
        <Icon name="ios-heart-outline" size={w(4)} type="ionicon" />
      </View>

      {showDate && (
        <DateTimePicker
          minimumDate={new Date()}
          value={new Date()}
          mode="date"
          onChange={onChange}
        />
      )}
      <FlatList
        keyExtractor={(item, index) => `${index}`}
        data={data}
        // contentContainerStyle={{ alignItems: 'center' }}
        renderItem={renderItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: w(2),
    marginHorizontal: w(10),
    width: w(100),
    alignSelf: 'center',
    borderColor: colorSet.foregroundColor,
  },
  container: {
    backgroundColor: colorSet.mainBackgroundColor,
    paddingTop: w(10),

    flex: 1,
  },
  title: {
    fontSize: w(3.5),
    color: '#6F6F6F',
    marginHorizontal: w(10),
  },
  subTitle: {
    fontSize: w(4),
    color: '#3F4553',
    fontWeight: 'bold',
    marginTop: w(2),
    marginBottom: w(2),
    marginRight: w(2),
    marginHorizontal: w(10),
  },
  customInput: {
    borderBottomColor: '#4c669f',
    borderBottomWidth: w(0.5),
    color: '#4c669f',
    padding: 0,
    width: w(40),
    marginBottom: w(4),
  },
  buttonText: {
    color: '#fff',
    fontSize: w(5),
    fontWeight: 'bold',
  },
  selectionButton: {
    padding: w(4),
    paddingTop: w(2),
    borderRadius: w(3),
    textAlignVertical: 'center',
    textAlign: 'center',
    backgroundColor: '#4c669f',
    color: '#fff',
    fontSize: w(3.5),
    fontWeight: 'bold',
  },
  modalView: {
    width: w(90),
    height: w(70),
    backgroundColor: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButton: {
    fontSize: w(3.5),
    marginHorizontal: w(2),
    color: '#fff',
    fontWeight: 'bold',
  },
});
