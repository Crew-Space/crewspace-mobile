import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ContentsRouterParamList } from 'types/Route';
import { MainNavigation, InvitationNavigation } from 'navigation';
import LoginScreen from 'containers/LoginScreen';

const Stack = createStackNavigator<ContentsRouterParamList>();

const ContentsNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Main'>
      <Stack.Screen name='Invitation' component={InvitationNavigation} />
      <Stack.Screen name='Main' component={MainNavigation} />
      <Stack.Screen name='Post' component={LoginScreen} />
      <Stack.Screen name='EditCategory' component={LoginScreen} />
      <Stack.Screen name='PostDetails' component={LoginScreen} />
      <Stack.Screen name='Search' component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default ContentsNavigation;
