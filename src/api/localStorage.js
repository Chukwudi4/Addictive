import AsyncStorage from '@react-native-community/async-storage';
import { SET_USER } from '../../redux/constants';
import config from '../config';

export const updateUserOnLocalDb = async (user, username) => {
  await AsyncStorage.setItem(SET_USER, {
    uid: user.uid,
    username,
  });
};

export const retreiveUserFromLocalDb = async () => {
  const user = await AsyncStorage.getItem(SET_USER);
  return user;
};

export const registerApp = async () => {
  const check = await AsyncStorage.getItem(config.APP_NAME, 'advdd');
};

export const isAppRegistered = async () => {
  const check = await AsyncStorage.getItem(config.APP_NAME);
  return check;
};
