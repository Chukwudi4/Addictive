import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../src/Home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { CreateScreen } from '../src/Create/CreateScreen';
import WelcomeScreen from '../src/Welcome/WelcomeScreen';
import { View } from 'react-native';
import SplashScreen from '../src/Splash/SplashScreen';
import LoadScreen from '../src/Load/LoadScreen';
import RegisterScreen from '../src/Create/RegisterScreen';
import CustomScreen from '../src/CustomScreen/CustomScreen';
const Home = createStackNavigator();
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
        options={{ title: '' }}
        name="Register"
        component={RegisterScreen}
      />
      <Home.Screen name="Welcome" component={WelcomeScreen} />
      <Home.Screen
        options={{ headerBackImage: () => null }}
        name="Create"
        component={CreateScreen}
      />
      <Home.Screen name="Custom" component={CustomScreen} />
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
