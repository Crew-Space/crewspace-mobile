import React from 'react';
import { Animated, StyleSheet, View, ViewProps } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { plus } from 'assets/svg/icons';
import { BLACK, PRIMARY, WHITE } from 'theme/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'theme/Metrics';
import { setCurrentSpace } from 'store/slices/space';

import Text from 'components/Text';
import SvgIcon from 'components/SvgIcon';
import MenuItem from './MenuItem';
import useSideMenuAnimation from './useSideMenuAnimation';
import { useResetAllApiState } from 'store';
import { ASYNC_STORAGE_KEY } from 'constant/AsyncStorage';
import { useNavigation } from '@react-navigation/core';
import { RootRouterParams } from 'types/Route';

const SLIDE_MENU_WIDTH = 300;
const SLIDE_DURATION = 200;

const SideMenu = ({ children, ...restProps }: ViewProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootRouterParams>();
  const currentSpace = useSelector((state) => state.space.current);
  const mySpaces = useSelector((state) => state.space.mySpaces);

  const resetApiState = useResetAllApiState();

  const [translateAnim, fadeAnim, expanded, toggleExpaned] = useSideMenuAnimation(
    SLIDE_MENU_WIDTH,
    SLIDE_DURATION,
  );

  return (
    <View {...restProps} style={[styles.container]}>
      {children}
      {expanded && (
        <Animated.View
          style={[styles.background, { opacity: fadeAnim }]}
          onTouchEnd={() => toggleExpaned()}
        />
      )}
      <Animated.View
        style={[
          styles.sidemenu,
          {
            transform: [{ translateX: translateAnim }],
            left: -SLIDE_MENU_WIDTH,
          },
        ]}>
        <View style={styles.title}>
          <Text fontType={'BOLD_18'}>동아리 스페이스</Text>
          <SvgIcon
            xml={plus}
            fill={PRIMARY}
            width={24}
            onPress={() => {
              navigation.navigate('Invitation');
              toggleExpaned();
            }}
          />
        </View>
        <ScrollView>
          {mySpaces.map((space) => (
            <MenuItem
              space={space}
              key={space.spaceId}
              isActive={currentSpace.spaceId === space.spaceId}
              onPress={() => {
                dispatch(setCurrentSpace(space));
                resetApiState();
                (async function () {
                  await AsyncStorage.setItem(ASYNC_STORAGE_KEY.SPACE_ID, space.spaceId.toString());
                })();
                toggleExpaned();
              }}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: BLACK,
    opacity: 0.7,
  },
  sidemenu: {
    position: 'absolute',
    width: SLIDE_MENU_WIDTH,
    height: SCREEN_HEIGHT,
    paddingTop: getStatusBarHeight(),
    backgroundColor: WHITE,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 19,
    paddingHorizontal: 20,
  },
});

export default SideMenu;
