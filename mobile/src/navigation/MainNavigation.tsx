import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';

import { MainRouterParamList } from 'types/Route';
import { SettingsNavigation } from 'navigation';
import LoginScreen from 'containers/LoginScreen';
import Text from 'components/Text';
import { GRAY2, PRIMARY } from 'theme/Colors';
import { home, notice, community, member, settings } from 'assets/svg/icons';

const Tab = createBottomTabNavigator<MainRouterParamList>();

const TarBarLabel = ({ focused, text }: { focused: boolean; text: string }) => (
  <Text fontType={'REGULAR_12'} style={{ color: focused ? PRIMARY : GRAY2 }}>
    {text}
  </Text>
);

const TabBarIcon = ({ focused, xml }: { focused: boolean; xml: string }) => (
  <SvgXml xml={xml} fill={focused ? PRIMARY : GRAY2} />
);

const MainNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarStyle: { paddingTop: 10 },
      }}>
      <Tab.Screen
        name='Home'
        component={LoginScreen}
        options={() => ({
          headerShown: false,
          tabBarLabel: ({ focused }) => <TarBarLabel focused={focused} text={'홈'} />,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} xml={home} />,
        })}
      />
      <Tab.Screen
        name='Notice'
        component={LoginScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => <TarBarLabel focused={focused} text={'공지'} />,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} xml={notice} />,
        }}
      />
      <Tab.Screen
        name='Community'
        component={LoginScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => <TarBarLabel focused={focused} text={'커뮤니티'} />,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} xml={community} />,
        }}
      />
      <Tab.Screen
        name='MemberList'
        component={LoginScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => <TarBarLabel focused={focused} text={'회원'} />,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} xml={member} />,
        }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsNavigation}
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => <TarBarLabel focused={focused} text={'설정'} />,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} xml={settings} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
