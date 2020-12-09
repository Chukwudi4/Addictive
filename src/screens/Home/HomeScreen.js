import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAddictions } from '../../../redux/actions';
import moment from 'moment';
import { Range, getMedal } from '../../api/medals';
import config from '../../config';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import { colorSet } from '../../appStyles';
import { Icon } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ConfirmResetModal from '../../components/ConfirmResetModal/ConfirmResetModal';

export function HomeScreen({ navigation, route }) {
  const [addictions] = useState([]);
  const stateAddictions = useSelector((state) => state.app.addictions);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAddictions();
  }, [stateAddictions]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="bell-outline"
          type="material-community"
          color={colorSet.lightText}
          style={{ marginRight: w(5) }}
        />
      ),
    });
  });

  const fetchAddictions = async () => {
    const addictionsString = await AsyncStorage.getItem('addictions');
    const savedAddictions = JSON.parse(addictionsString);
    if (savedAddictions) {
      dispatch(setAddictions(savedAddictions));
    }
  };

  const renderAddictions = ({ item }) => {
    var now = new Date();
    var startDate = new Date(item.date);

    const diff = Date.now() - item.date;
    const today = now.getDate() > 9 ? `${now.getDate()}` : `0${now.getDate()}`;
    const firstDay =
      startDate.getDate() > 9
        ? `${startDate.getDate()}`
        : `0${startDate.getDate()}`;

    const markedDates = {};
    markedDates[`${now.getFullYear()}-${now.getMonth() + 1}-${today}`] = {
      textColor: '#fff',
      color: colorSet.foregroundColor,
      startingDay: false,
      endingDay: true,
    };

    markedDates[
      `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${firstDay}`
    ] = {
      startingDay: true,
      endingDay: false,
      textColor: '#fff',
      color: 'red',
    };

    // console.log(markedDates);

    const days = parseInt(diff / (60 * 60 * 24 * 1000), 10);
    // console.log(days);
    const medal = getMedal(days);
    return (
      <View>
        <Text
          style={{
            fontSize: w(3),
            color: colorSet.lightText,
            fontWeight: 'bold',
            marginBottom: w(2),
          }}>
          Rank
        </Text>
        <View style={styles.medalContainer}>
          <Text style={styles.medalName}>{item.title}</Text>
          <Text style={styles.medalTitle}>Sobriety level: {medal.title}</Text>
          <Icon
            name="medal"
            type="material-community"
            color={medal.color}
            size={w(6)}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            width: w(90),
            marginVertical: w(2.5),
          }}>
          <Text
            style={{
              fontSize: w(3),
              color: colorSet.lightText,
              fontWeight: 'bold',
            }}>
            Your Addiction counter
          </Text>
          <Icon name="refresh" color={colorSet.lightText} />
        </View>

        <View style={styles.conterContainer}>
          <Progress.Circle
            formatText={() => `${days}`}
            progress={days / 30}
            showsText={true}
            textStyle={{
              fontSize: w(5.5),
              color: colorSet.lightText,
              zIndex: 131,
            }}
            animated={true}
            thickness={w(2.5)}
            borderWidth={0}
            unfilledColor="rgba(128, 128, 0, 0.06)"
            color={colorSet.foregroundColor}
            size={w(20)}
            // indeterminate={true}
          />
          <Text style={styles.daysText}>{days !== 1 ? 'days' : 'day'}</Text>
        </View>
        <Text
          style={{
            fontSize: w(3),
            color: colorSet.lightText,
            fontWeight: 'bold',
            marginTop: w(3),
          }}>
          Today
        </Text>
        <Calendar
          // Collection of dates that have to be colored in a special way. Default = {}
          markedDates={markedDates}
          style={{
            marginVertical: w(2),
            shadowColor: '#fff',
            shadowOffset: { height: 5, width: 5 },
            shadowRadius: 5,
            elevation: 2,
            width: w(90),
            borderRadius: w(1),
          }}
          markingType={'period'}
          // current
          minDate={`${startDate.getFullYear()}-${startDate.getMonth() + 1}-01`}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={`${now.getFullYear()}-${now.getMonth() + 1}-${today}`}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ConfirmResetModal
        modalInfo="By resetting this you get to lose your Sobriety count"
        buttonTitle="Yes, I'm sure"
        confirmQuestion="Are your sure you want to reset your counter?"
        imageTitle="A minute with Tessy Omah"
        cancelText="Cancel"
        imageSource={require('../../assets/resetimage.png')}
      />
      <FlatList
        data={stateAddictions}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', width: w(100) }}
        renderItem={renderAddictions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorSet.mainBackgroundColor,
    flex: 1,
    paddingTop: w(5),
  },
  medalContainer: {
    padding: w(2),
    alignItems: 'flex-start',
    borderRadius: w(1),
    backgroundColor: colorSet.tintColor,
    width: w(50),
    shadowColor: '#fff',
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 5,
    elevation: 2,
  },
  medalTitle: {
    fontSize: w(3.5),
    color: '#BDBDBD',
    marginVertical: w(1),
  },
  medalName: {
    fontSize: w(3.5),
    color: '#848484',
    marginTop: w(2),
    marginBottom: w(1),

    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  conterContainer: {
    flexDirection: 'row',
    padding: w(5),
    backgroundColor: colorSet.tintColor,
    width: w(100),
    alignItems: 'center',
    borderRadius: w(1),
    height: h(25),
    shadowColor: '#fff',
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 5,
    elevation: 2,
    width: w(90),
  },
  daysText: {
    fontSize: w(7),
    color: colorSet.lightText,
    marginLeft: w(7),
  },
  headerText: {
    color: '#222831',
    fontSize: 16,
    marginHorizontal: 3,
  },
  titleText: {
    color: '#fff',
    fontSize: w(6),
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
