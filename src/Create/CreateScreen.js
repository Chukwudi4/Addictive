import AsyncStorage from '@react-native-community/async-storage';
import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { widthPercentageToDP as w } from 'react-native-responsive-screen';
import UUIDGenerator from 'react-native-uuid-generator';
import { useDispatch } from 'react-redux';
import { addAddictions } from '../../redux/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { colorSet } from '../appStyles';

export function CreateScreen({ navigation, route }) {
  const addictionData = [
    'Smoking ',
    'Alcohol',
    'Pornography and Masturbation',
    'Substance Use e.g Heroin, Lean, Crack and other hard drugs',
    'Social Media',
    'Sex',
    'Junk food e.g Soda, Burgers and other processed food',
  ];

  const [selected, setSelected] = useState(-1);
  const [data] = useState(addictionData);
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [custom, setCustom] = useState('');
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState(data);
  const addictions = route.params?.addictions ?? [];
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text style={styles.headerButton} onPress={save}>
          Done
        </Text>
      ),
      headerLeft: () => (
        <Text style={styles.headerButton} onPress={() => setVisible(true)}>
          Other
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
    // const id = await UUIDGenerator.getRandomUUID();

    // const data = {
    //   title: items[selected],
    //   date: date.getTime(),
    //   id,
    // };

    // addictions.push(data);
    // dispatch(addAddictions(data));
    // const addictionsString = JSON.stringify(addictions);
    // AsyncStorage.setItem('addictions', addictionsString);
    navigation.navigate('Custom');
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
                  ? colorSet.foregroundColor
                  : colorSet.mainBackgroundColor,
            },
          ]}
          onPress={() => {
            setSelected(index);
            console.log(index);
          }}>
          <Text
            style={[
              styles.title,
              { color: index === selected ? '#fff' : '#6F6F6F' },
            ]}>
            {item}
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
      <Modal
        style={{ alignItems: 'center', justifyContent: 'center' }}
        transparent
        visible={visible}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.customInput}
            placeholder="Opiod"
            onChangeText={(text) => setCustom(text)}
            value={custom}
          />
          <View
            style={{
              justifyContent: 'space-between',
              width: w(40),
              flexDirection: 'row',
            }}>
            <Text
              onPress={() => setVisible(false)}
              style={styles.selectionButton}>
              Cancel
            </Text>
            <Text
              onPress={() => {
                if (!custom) {
                  return;
                }
                items.push(custom);
                setSelected(items.length - 1);
                setItems(items);
                setVisible(false);
              }}
              style={styles.selectionButton}>
              Done
            </Text>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>What habit are you trying to stop?</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.subTitle}>Select one</Text>
        <Text>heart icon</Text>
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
        keyExtractor={(item) => item}
        data={items}
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
    borderBottomWidth: w(0.05),
    borderTopWidth: w(0.05),
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
