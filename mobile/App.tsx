import React from 'react';
import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';

import RootNavigation from 'navigation/RootNavigation';
import store from 'store';
import SideMenu from 'components/side-menu';

// LogBox.ignoreAllLogs();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <Provider store={store}>
        <SideMenu>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootNavigation />
        </SideMenu>
      </Provider>
    </>
  );
};

export default App;
