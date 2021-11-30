import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { close } from 'assets/svg/icons';
import { RootRouterParamList } from 'types/Route';
import { BLACK, PRIMARY } from 'theme/Colors';
import { InvitationNavigation, MainNavigation } from 'navigation';
import {
  EditCategoryScreen,
  LoginScreen,
  PostScreen,
  SearchScreen,
  MemberProfileDetailsScreen,
  PostDetailsScreen,
} from 'containers';
import Text from 'components/Text';
import { PostScreenHeader, CategorySelectorHeader } from 'components/Header';

const Stack = createStackNavigator<RootRouterParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={'Auth'}>
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
      <Stack.Screen
        name='Main'
        component={MainNavigation}
        options={{
          header: CategorySelectorHeader,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name='Post'
        component={PostScreen}
        options={{
          header: PostScreenHeader,
        }}
      />
      <Stack.Screen
        name='EditCategory'
        component={EditCategoryScreen}
        options={{
          headerTitle: '카테고리 관리',
          headerLeft: ({ onPress }) => (
            <TouchableOpacity onPress={onPress}>
              <SvgXml xml={close} width={24} fill={BLACK} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log('완료')}>
              <Text color={PRIMARY}>완료</Text>
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: { paddingLeft: 20, paddingVertical: 18 },
          headerRightContainerStyle: { paddingRight: 20 },
        }}
      />
      <Stack.Screen
        name='PostDetails'
        component={PostDetailsScreen}
        options={({ navigation }) => ({
          headerTitle: '상세 보기',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <SvgXml xml={close} width={24} fill={BLACK} />
            </TouchableOpacity>
          ),
          // headerRight: () => (
          //   <TouchableOpacity>
          //     <SvgXml xml={moreVertical} width={24} fill={BLACK} />
          //   </TouchableOpacity>
          // ),
          headerLeftContainerStyle: { paddingLeft: 20, paddingVertical: 18 },
          headerRightContainerStyle: { paddingRight: 20 },
        })}
      />
      <Stack.Screen
        name='Search'
        component={SearchScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Stack.Screen
        name='MemberProfileDetails'
        component={MemberProfileDetailsScreen}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <SvgXml xml={close} width={24} fill={BLACK} />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: { paddingLeft: 20, paddingVertical: 18 },
        })}
      />
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
