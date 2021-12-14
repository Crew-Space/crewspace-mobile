import React, { useEffect } from 'react';
import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import CookieManager from '@react-native-cookies/cookies';

import RootNavigation from 'navigation/RootNavigation';
import store from 'store';

// LogBox.ignoreAllLogs();
const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    const fcmToken = await messaging().getToken();
    console.log(fcmToken);
  }
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    CookieManager.clearAll();
    requestUserPermission();
  }, []);

  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RootNavigation />
      </Provider>
    </>
  );
};

export default App;
