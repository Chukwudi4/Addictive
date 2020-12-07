import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import appStyles, { colorSet } from '../appStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { addAddictions } from '../../redux/actions';
import UUIDGenerator from 'react-native-uuid-generator';
import OnboardHeader from '../components/OnboardHeader/OnboardHeader';

export default function CustomScreen({ navigation, route }) {
  const [input, setInput] = useState('');
  const addictions = route.params?.addictions ?? [];
  const dispatch = useDispatch();

  const onFinish = async () => {
    if (input === '') {
      Alert.alert('Error', 'Please you need to enter something valid');
      return;
    }
    Alert.alert(
      'Confirmation',
      `Are you sure you want to proceed with your selection? `,
      [
        { text: 'No, Cancel', onPress: () => console.log('ok') },
        { text: 'Yes', onPress: () => proceedToHome() },
      ],
      { cancelable: false },
    );
    return;
  };

  const proceedToHome = async () => {
    const id = await UUIDGenerator.getRandomUUID();

    const data = {
      title: data[selected],
      date: date.getTime(),
      id,
    };

    addictions.push(data);
    dispatch(addAddictions(data));
    const addictionsString = JSON.stringify(addictions);
    AsyncStorage.setItem('addictions', addictionsString);
    navigation.navigate('Tab', { screen: 'Home' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What habit are you running from?</Text>
      <Text style={styles.subTitle}>Write one</Text>
      <TextInput
        defaultValue={input}
        placeholder="Smoking cigarettes, indian hemp, etc"
        placeholderTextColor="#000000"
        onChangeText={setInput}
        style={styles.textInput}
      />
      <Pressable onPress={() => onFinish()}>
        <Text
          style={[
            appStyles.button,
            {
              backgroundColor:
                input === '' ? colorSet.grey : colorSet.foregroundColor,
            },
          ]}>
          Continue
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorSet.mainBackgroundColor,
    paddingTop: w(10),
    paddingHorizontal: w(10),
    flex: 1,
  },
  title: {
    fontSize: w(3.5),
    color: '#6F6F6F',
  },
  subTitle: {
    fontSize: w(4),
    color: '#3F4553',
    fontWeight: 'bold',
    marginTop: w(2),
    marginBottom: w(8),
  },
  textInput: {
    fontSize: w(3.5),
    borderWidth: w(0.4),
    borderRadius: w(2),
    borderColor: colorSet.foregroundColor,
    marginTop: w(2),
    marginBottom: w(10),
    paddingHorizontal: w(2),
  },
});
