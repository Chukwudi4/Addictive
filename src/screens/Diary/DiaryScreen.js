import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { colorSet } from '../../appStyles';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEntriesFromLocalDB,
  saveEntriesOnLocalDB,
} from '../../api/localStorage';
import { setEntries } from '../../../redux/actions';
import { useFocusEffect } from '@react-navigation/native';

export default function DiaryScreen({ navigation }) {
  const entries = useSelector((state) => state.app.entries);
  const dispatch = useDispatch();

  useEffect(() => {
    loadEntries();
  }, []);

  useFocusEffect(() => {
    persistEntries();
  }, [entries]);

  const persistEntries = async () => {
    if (entries.length !== 0) {
      await saveEntriesOnLocalDB(entries);
    }
  };

  const loadEntries = async () => {
    const savedEntries = await fetchEntriesFromLocalDB();
    dispatch(setEntries(savedEntries));
  };

  const renderDiaryEntry = (item, index) => {
    var m = moment(item.updated);
    var now = moment(new Date());
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddEntry', { newIndex: index, index })
        }
        style={{ width: w(90), marginVertical: w(2) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colorSet.mainTextColor, fontSize: w(3.5) }}>
            {item.title}
          </Text>
          <Text style={{ color: colorSet.mainTextColor, fontSize: w(3) }}>
            {m.fromNow()}
          </Text>
        </View>
        <Text
          numberOfLines={2}
          style={{ color: colorSet.lightText, fontSize: w(3.5) }}>
          {item.details}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon
          color={colorSet.lightText}
          name="ios-search-outline"
          type="ionicon"
          size={w(4)}
        />
        <TextInput
          placeholder="Search through diary"
          style={styles.searchInput}
        />
      </View>
      <Pressable
        onPress={() =>
          navigation.navigate('AddEntry', { newIndex: entries.length })
        }
        style={styles.addButton}>
        <Icon name="add" size={w(12)} color={colorSet.foregroundColor} />
      </Pressable>
      {false && (
        <View style={{ alignItems: 'center' }}>
          <Image
            style={styles.emptyImage}
            source={require('../../assets/emptydiary.png')}
          />
          <Text style={styles.emptyTitle}>Uh Oh, Your Diary is empty</Text>
          <Text style={styles.emptyTip}>
            Use the icon below to create a fresh diary
          </Text>
        </View>
      )}
      <FlatList
        data={entries}
        renderItem={({ item, index }) => renderDiaryEntry(item, index)}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorSet.mainBackgroundColor,
    padding: w(5),
    alignItems: 'center',
    flex: 1,
  },
  searchContainer: {
    backgroundColor: 'rgba(142, 142, 147, 0.04)',
    borderRadius: w(5),
    paddingHorizontal: w(3),
    marginHorizontal: w(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    width: w(60),
    fontSize: w(3),
    marginHorizontal: w(1),
  },
  emptyImage: {
    width: w(20),
    height: w(20),
    marginTop: h(15),
  },
  emptyTitle: {
    fontSize: w(3.5),
    color: colorSet.lightText,
    marginTop: w(5),
    marginBottom: w(7),
  },
  emptyTip: {
    color: '#848484',
    fontSize: w(3.5),
  },
  addButton: {
    width: w(15),
    height: w(15),
    justifyContent: 'center',
    backgroundColor: colorSet.tintColor,
    alignItems: 'center',
    borderRadius: w(7.5),
    shadowColor: '#fff',
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 5,
    elevation: 4,
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
