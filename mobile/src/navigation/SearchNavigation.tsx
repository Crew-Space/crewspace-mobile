import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SearchParamList } from 'types/Route';
import LoginScreen from 'containers/LoginScreen';

const Stack = createStackNavigator<SearchParamList>();

const SearchNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Search'>
      <Stack.Screen name='Search' component={LoginScreen} />
      <Stack.Screen name='MemberDetails' component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
