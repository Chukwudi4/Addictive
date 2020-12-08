import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colorSet } from '../../appStyles';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import moment from 'moment';

export default function DiaryScreen({ navigation }) {
  const [entries] = useState([
    {
      updated: Date.now() - 300000,
      title: '#1',
      details: 'I felt like crying',
    },
    {
      updated: Date.now() - 600000,
      title: '#2',
      details: 'I wanted to call it quits but I strived',
    },
  ]);

  const renderDiaryEntry = (item) => {
    const updated = new Date();
    updated.setMilliseconds(item.updated);
    var m = moment(updated);
    var now = moment(new Date());
    return (
      <View style={{ width: w(80), marginVertical: w(2) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colorSet.mainTextColor, fontSize: w(3.5) }}>
            {item.title}
          </Text>
          <Text style={{ color: colorSet.mainTextColor, fontSize: w(3) }}>
            updated {now.from(m)}
          </Text>
        </View>
        <Text
          numberOfLines={2}
          style={{ color: colorSet.lightText, fontSize: w(3.5) }}>
          {item.details}
        </Text>
      </View>
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
        onPress={() => navigation.navigate('AddEntry')}
        style={styles.addButton}>
        <Icon name="add" size={w(12)} color={colorSet.foregroundColor} />
      </Pressable>
      {false && (
        <View style={{ alignItems: 'center' }}>
          <Image
            style={styles.emptyImage}
            source={require('../assets/emptydiary.png')}
          />
          <Text style={styles.emptyTitle}>Uh Oh, Your Diary is empty</Text>
          <Text style={styles.emptyTip}>
            Use the icon below to create a fresh diary
          </Text>
        </View>
      )}
      <FlatList
        data={entries}
        renderItem={({ item }) => renderDiaryEntry(item)}
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
