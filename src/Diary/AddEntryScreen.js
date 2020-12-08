import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { colorSet } from '../appStyles';
import { widthPercentageToDP as w } from 'react-native-responsive-screen';

export default function AddEntryScreen(params) {
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'center', width: w(80) }}>
        <Text style={styles.info}>Edit your entry</Text>
      </View>
      <TextInput
        placeholder="#1"
        style={[styles.textInput, { marginVertical: w(3) }]}
      />
      <TextInput
        placeholder="How are you feeling today"
        multiline
        style={styles.textInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: w(10),
    alignItems: 'center',
    backgroundColor: colorSet.mainBackgroundColor,
  },
  textInput: {
    fontSize: w(3.5),
    borderWidth: w(0.4),
    borderRadius: w(2),
    borderColor: colorSet.foregroundColor,
    marginTop: w(1),
    width: w(80),
    paddingHorizontal: w(2),
  },
  info: {
    fontSize: w(3),
    color: colorSet.lightText,
    marginVertical: w(1),
    alignItems: 'center',
  },
});
