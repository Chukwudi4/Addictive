import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { setAddictions } from '../../redux/actions';

export default function WelcomeScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAddictions();
  }, []);

  const fetchAddictions = async () => {
    const addictionsString = await AsyncStorage.getItem('addictions');
    const savedAddictions = JSON.parse(addictionsString);
    if (savedAddictions) {
      dispatch(setAddictions(savedAddictions));
      navigation.navigate('Home');
      return;
    }
    navigation.navigate('Create');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome</Text>
    </View>
  );
}
