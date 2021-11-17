import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from 'containers/LoginScreen';
import { RootRouterParamList } from 'types/Route';
import { InvitationNavigation, MainNavigation } from 'navigation';

const Stack = createStackNavigator<RootRouterParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Auth'>
      <Stack.Screen
        name='Auth'
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Invitation'
        component={InvitationNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='Main' component={MainNavigation} />
      <Stack.Screen name='Post' component={LoginScreen} />
      <Stack.Screen name='EditCategory' component={LoginScreen} />
      <Stack.Screen name='PostDetails' component={LoginScreen} />
      <Stack.Screen name='Search' component={LoginScreen} />
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
