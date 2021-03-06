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
import { useDispatch } from 'react-redux';
import { signIn } from '../../api/auth';
import { setUser, setAddictions } from '../../../redux/actions';
import {
  saveAddictionsOnLocalDb,
  updateUserOnLocalDb,
} from '../../api/localStorage';
import appStyles, { colorSet } from '../../appStyles';
import { fetchAddictionsFromDB } from '../../api/storage';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onFinish = () => {
    if (username === '') {
      Alert.alert('No username', 'Please enter a valid username');
      return;
    }
    signIn(username, password).then(async (res) => {
      if (res.success) {
        dispatch(
          setUser({
            uid: res.user.uid,
            username,
          }),
        );
        const addictions = await fetchAddictionsFromDB(res.user.uid);

        updateUserOnLocalDb(res.user, username);
        if (addictions?.length !== 0) {
          dispatch(setAddictions(addictions));
          saveAddictionsOnLocalDb(addictions);
          navigation.navigate('Tab', { screen: 'Home' });
          return;
        }
        navigation.navigate('Onboard', { screen: 'Create' });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Before we go on</Text>
      <Text style={styles.subTitle}>What name should we call you?</Text>
      <TextInput
        defaultValue={username}
        placeholder="username"
        placeholderTextColor="#000000"
        onChangeText={setUsername}
        style={[styles.textInput, { marginBottom: w(2) }]}
      />
      <TextInput
        defaultValue={password}
        placeholder="pas***rd"
        secureTextEntry={true}
        placeholderTextColor="#000000"
        onChangeText={setPassword}
        style={styles.textInput}
      />
      <Pressable onPress={() => onFinish()}>
        <Text
          style={[
            appStyles.button,
            {
              backgroundColor:
                username === '' ? colorSet.grey : colorSet.foregroundColor,
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
