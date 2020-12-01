import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../src/Home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { CreateScreen } from '../src/Create/CreateScreen';
import WelcomeScreen from '../src/Welcome/WelcomeScreen';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import SplashScreen from '../src/Splash/SplashScreen';
import LoadScreen from '../src/Load/LoadScreen';
import RegisterScreen from '../src/Create/RegisterScreen';
import CustomScreen from '../src/CustomScreen/CustomScreen';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import { colorSet } from '../src/appStyles';
import { Icon } from 'react-native-elements';
const Home = createStackNavigator();
const Onboard = createStackNavigator();

function OnboardStack() {
  return (
    <Onboard.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          height: h(7),
          backgroundColor: colorSet.mainBackgroundColor,
          elevation: 0,
        },
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
      })}>
      <Onboard.Screen
        options={{
          title: '',
          headerShown: true,
          headerBackImage: () => <View />,
        }}
        name="Register"
        component={RegisterScreen}
      />
      <Onboard.Screen
        options={{ title: '' }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <Onboard.Screen
        options={{
          title: '',
        }}
        name="Create"
        component={CreateScreen}
      />
      <Onboard.Screen
        options={{
          title: '',
        }}
        name="Custom"
        component={CustomScreen}
      />
    </Onboard.Navigator>
  );
}

export function HomeStack() {
  return (
    <Home.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4c669f',
        },
        headerTitleStyle: {
          color: '#222831',
        },
      }}>
      <Home.Screen
        options={{ headerShown: false }}
        name="Load"
        component={LoadScreen}
      />
      <Home.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={SplashScreen}
      />
      <Home.Screen
        options={{ headerShown: false }}
        name="Onboard"
        component={OnboardStack}
      />
      <Home.Screen
        options={{ headerBackImage: () => null }}
        name="Home"
        component={HomeScreen}
      />
    </Home.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
