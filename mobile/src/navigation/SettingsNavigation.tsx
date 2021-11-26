import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsParamList } from 'types/Route';
import { SettingsScreen } from 'containers';

const Stack = createStackNavigator<SettingsParamList>();

const SettingsNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Settings'>
      <Stack.Screen name='Settings' component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
