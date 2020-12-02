import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
export const colorSet = {
  mainBackgroundColor: '#F2FFE5',
  foregroundColor: '#808000',
  tintColor: '#FFFFFF',
  mainTextColor: '#3F4553',
  subTextColor: '#848484',
  grey: 'grey',
  lightText: '#6F6F6F',
  // altTextColor: '#373737'
};

const appStyles = StyleSheet.create({
  button: {
    width: w(80),
    padding: w(3),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colorSet.mainBackgroundColor,
    borderRadius: w(2),
    fontSize: w(4),
    fontWeight: 'bold',
    backgroundColor: colorSet.foregroundColor,
    alignSelf: 'center',
  },
  headerTitleStyle: {
    color: colorSet.lightText,
    fontSize: w(3.5),
  },
});

export default appStyles;
