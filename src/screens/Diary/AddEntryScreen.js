import React, { useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import appStyles, { colorSet } from '../../appStyles';
import { widthPercentageToDP as w } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { editEntry, saveEntry } from '../../../redux/actions';

export default function AddEntryScreen({ route, navigation }) {
  const index = route?.params?.index ?? -1;
  const newIndex = route?.params?.newIndex ?? -2;
  const [title, setTitle] = useState(`#${newIndex + 1}`);
  const [details, setDetails] = useState('');

  const dispatch = useDispatch();
  const entries = useSelector((state) => state.app.entries);

  useLayoutEffect(() => {
    if (index !== -1) {
      setTitle(entries[index].title);
      setDetails(entries[index].details);
    }
  }, []);

  const goBack = () => {
    if (newIndex != index) {
      dispatch(
        saveEntry({
          title,
          details,
          updated: Date.now(),
        }),
      );
    } else {
      dispatch(
        editEntry(
          {
            title,
            details,
            updated: Date.now(),
          },
          index,
        ),
      );
    }
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackImage: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backIconStyle}>
          <Icon
            style={{ alignSelf: 'center' }}
            color="#3F414E"
            name="arrow-back-ios"
          />
        </TouchableOpacity>
      ),
    });
  });
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'center', width: w(80) }}>
        <Text style={styles.info}>Edit your entry</Text>
      </View>
      <TextInput
        placeholder="#1"
        defaultValue={title}
        onChangeText={setTitle}
        style={[styles.textInput, { marginVertical: w(3) }]}
      />
      <TextInput
        defaultValue={details}
        onChangeText={setDetails}
        placeholder="How are you feeling today"
        multiline
        style={[styles.textInput, { marginBottom: w(15) }]}
      />
      <Pressable onPress={() => goBack()}>
        <Text
          style={[
            appStyles.button,
            {
              backgroundColor:
                details === '' ? colorSet.grey : colorSet.foregroundColor,
            },
          ]}>
          Save
        </Text>
      </Pressable>
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
  backIconStyle: {
    padding: w(3),
    borderRadius: w(5),
    width: w(10),
    height: w(10),
    backgroundColor: 'rgba(128, 128, 0, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: w(4),
  },
});
