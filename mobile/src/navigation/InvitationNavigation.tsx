import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { InvitationParamList } from 'types/Route';
import LoginScreen from 'containers/LoginScreen';

const Stack = createStackNavigator<InvitationParamList>();

const InvitationNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='SpaceCode'>
      <Stack.Screen name='SpaceCode' component={LoginScreen} />
      <Stack.Screen name='CreateSpace' component={LoginScreen} />
      <Stack.Screen name='EnterSpace' component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default InvitationNavigation;
