import React, { useEffect } from 'react';
import { Alert, LogBox, StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import messaging, { firebase } from '@react-native-firebase/messaging';

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
    requestUserPermission();

    firebase.messaging().onNotificationOpenedApp((remoteMessage) => {
      Alert.alert('FIREBASE IOS Background', JSON.stringify(remoteMessage));
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
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
