import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import config from '../../config';
import { useDispatch } from 'react-redux';
import { setAddictions } from '../../../redux/actions';
import { setUser } from '../../../redux/actions';
import { checkSignedIn } from '../../api/auth';
import {
  isAppRegistered,
  registerApp,
  retreiveUserFromLocalDb,
} from '../../api/localStorage';

export default function LoadScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => checkFirstOpen(), 3000);
  }, []);

  async function onAuthStateChanged(user) {
    const check = await isAppRegistered();
    console.log(user);
    if (!check && !user) {
      navigation.navigate('Splash');
      return;
    }

    registerApp();

    if (user) {
      dispatch(
        setUser({
          uid: user.uid,
          username: user.email.split('@')[0],
        }),
      );
      navigation.navigate('Tab', { screen: 'Home' });
      return;
    } else {
      navigation.navigate('Onboard', { screen: 'Create' });
    }
  }

  const checkFirstOpen = async () => {
    checkSignedIn(onAuthStateChanged);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash.png')}
        style={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
