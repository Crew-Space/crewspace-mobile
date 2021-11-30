import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsParamList } from 'types/Route';
import { SettingHome } from 'containers';

const Stack = createStackNavigator<SettingsParamList>();

const SettingsNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='SettingHome'>
      <Stack.Screen name='SettingHome' component={SettingHome} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
