import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import { HomeScreen } from '../src/Home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { CreateScreen } from '../src/Create/CreateScreen';
import WelcomeScreen from '../src/Welcome/WelcomeScreen';
import {View} from 'react-native'
import SplashScreen from '../src/Splash/SplashScreen';
import LoadScreen from '../src/Load/LoadScreen';
const Home = createStackNavigator()
export function HomeStack() {
    return(
        <Home.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#a3f7bf'
            },
            headerTitleStyle: {
                color: '#222831',
            }
        }} >
            <Home.Screen options={{headerShown: false}} name='Load' component={LoadScreen} />
            <Home.Screen options={{headerShown: false}} name='Splash' component={SplashScreen} />
            <Home.Screen name='Welcome' component={WelcomeScreen} />
            <Home.Screen options={{headerBackImage: () => null}} name='Create' component={CreateScreen} />
            <Home.Screen options={{headerBackImage: () => <View/>}} name='Home' component={HomeScreen} />
        </Home.Navigator>
    )
}

export function AppNavigator() {
    return(
        <NavigationContainer>
            <HomeStack/>
        </NavigationContainer>
    )
}