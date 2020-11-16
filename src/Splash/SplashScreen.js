import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import ViewPager from '@react-native-community/viewpager';
import config from '../config';
import AsyncStorage from '@react-native-community/async-storage';

export default function SplashScreen({ navigation }) {
  const SplashPage = ({ title, imgSource, description, button }) => {
    const finish = () => {
      AsyncStorage.setItem(config.APP_NAME, 'Sobrio');
      navigation.navigate('Create');
    };

    return (
      <View style={styles.container}>
        <View style={styles.messageBody}>
          <Text style={styles.appNameStyle}>Sobrio</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {button && (
            <Pressable onPress={() => finish()}>
              <Text style={styles.button}>{button}</Text>
            </Pressable>
          )}
        </View>
        <LinearGradient
          style={styles.container}
          colors={['#4c669f', '#3b5998', '#192f6a']}>
          <ImageBackground
            style={styles.imageBackground}
            resizeMode="cover"
            source={imgSource}
          />
        </LinearGradient>
      </View>
    );
  };

  return (
    <ViewPager style={styles.container} initialPage={0}>
      {config.splashData.map((data, index) => (
        <View key={index}>
          <SplashPage
            title={data.title}
            description={data.description}
            imgSource={data.imgSource}
            button={data?.button}
          />
        </View>
      ))}
    </ViewPager>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: w(100),
    height: h(100),
    opacity: 0.3,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  appNameStyle: {
    color: '#fff',
    fontSize: w(10),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: w(10),
  },
  title: {
    color: '#fff',
    fontSize: w(6),
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    color: '#fff',
    fontSize: w(4),
    fontWeight: '600',
    textAlign: 'center',
  },
  messageBody: {
    right: 10,
    left: 10,
    top: h(25),
    zIndex: 2,
    position: 'absolute',
    alignItems: 'center',
  },
  button: {
    width: w(70),
    padding: w(3),
    borderWidth: w(0.5),
    borderColor: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    borderRadius: w(2),
    marginTop: w(20),
    fontSize: w(4),
    fontWeight: 'bold',
  },
});
