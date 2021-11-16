import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from 'containers/LoginScreen';
import { ContentsNavigation } from 'navigation';
import { RootRouterParamList } from 'types/Route';

const Stack = createStackNavigator<RootRouterParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Auth'>
      <Stack.Screen name='Auth' component={LoginScreen} />
      <Stack.Screen name='Contents' component={ContentsNavigation} />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
