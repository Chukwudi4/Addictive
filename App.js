/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AppNavigator } from './navigation/Navigation';
import { store } from './redux/store';
const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <AppNavigator />
    </Provider>
  );
};

export default App;
