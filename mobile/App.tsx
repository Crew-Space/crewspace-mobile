import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ASYNC_STORAGE_KEY } from 'constant/AsyncStorage';
import RootNavigation from 'navigation/RootNavigation';
import store from 'store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [spaceId, setSpaceId] = useState<string>();
  console.log(spaceId);

  const setSpace = async () => {
    const id = await AsyncStorage.getItem(ASYNC_STORAGE_KEY.SPACE_ID);
    if (!id) return;

    setSpaceId(id);
  };

  useEffect(() => {
    setSpace();
    SplashScreen.hide();
  }, []);

  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RootNavigation initialRouteName={!spaceId ? 'Auth' : 'Main'} />
      </Provider>
    </>
  );
};

export default App;
