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

export default function RegisterScreen({ navigation }) {
  const [input, setInput] = useState('');

  const onFinish = () => {
    if (input === '') {
      Alert.alert('No username', 'Please enter a valid username');
      return;
    }
    navigation.navigate('Onboard', { screen: 'Create' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Before we go on</Text>
      <Text style={styles.subTitle}>What name should we call you?</Text>
      <TextInput
        defaultValue={input}
        placeholder="Full name"
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
