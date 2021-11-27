import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { InvitationParamList } from 'types/Route';
import { SpaceCodeScreen, WelcomeScreen } from 'containers';

const Stack = createStackNavigator<InvitationParamList>();

const InvitationNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='SpaceCode'>
      <Stack.Screen
        name='SpaceCode'
        component={SpaceCodeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default InvitationNavigation;
