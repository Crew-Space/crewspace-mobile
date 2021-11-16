import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainRouterParamList } from 'types/Route';
import { SettingsNavigation } from 'navigation';
import LoginScreen from 'containers/LoginScreen';

const Tab = createBottomTabNavigator<MainRouterParamList>();

const MainNavigation = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name='Home' component={LoginScreen} />
      <Tab.Screen name='Notice' component={LoginScreen} />
      <Tab.Screen name='Community' component={LoginScreen} />
      <Tab.Screen name='MemberList' component={LoginScreen} />
      <Tab.Screen name='Settings' component={SettingsNavigation} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
