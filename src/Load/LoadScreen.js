import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import config from '../config';
import { useDispatch } from 'react-redux';
import { setAddictions } from '../../redux/actions';

export default function LoadScreen({ navigation }) {
  const APP_NAME = 'appName';

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => checkFirstOpen(), 3000);
  }, []);

  const fetchAddictions = async () => {
    const addictionsString = await AsyncStorage.getItem('addictions');
    const savedAddictions = JSON.parse(addictionsString);
    if (savedAddictions) {
      dispatch(setAddictions(savedAddictions));
      navigation.navigate('Tab', { screen: 'Home' });
      return;
    }
    navigation.navigate('Onboard', { screen: 'Register' });
  };

  const checkFirstOpen = async () => {
    const check = await AsyncStorage.getItem(config.APP_NAME);
    console.log(check);
    if (check) {
      fetchAddictions();
      return;
    }
    navigation.navigate('Splash');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash.png')}
        style={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
