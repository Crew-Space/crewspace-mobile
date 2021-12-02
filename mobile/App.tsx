import React from 'react';
import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';

import RootNavigation from 'navigation/RootNavigation';
import store from 'store';

// LogBox.ignoreAllLogs();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

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
