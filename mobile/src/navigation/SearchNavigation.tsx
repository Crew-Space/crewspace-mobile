import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SearchParamList } from 'types/Route';
import { SearchScreen } from 'containers';

const Stack = createStackNavigator<SearchParamList>();

const SearchNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Search'>
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='MemberDetails' component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
