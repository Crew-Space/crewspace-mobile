import HeaderSelector from 'components/HeaderSelector';
import React from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';

import { WHITE } from 'theme/Colors';
import {
  HEADER_MAX_HEIGHT,
  HEADER_SCROLL_DISTANCE,
  STICKY_EXPANDABLE_HEADER_HEIGHT,
} from './constant';

interface Props {
  scrollYState: Animated.Value;
  headerImageUrl: string;
}

const HomeHeader = ({ scrollYState, headerImageUrl }: Props) => {
  const scrollY = Animated.add(
    scrollYState,
    Platform.OS === 'ios' ? HEADER_MAX_HEIGHT + STICKY_EXPANDABLE_HEADER_HEIGHT : 0,
  );

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslate }] }]}>
        <Animated.Image
          style={[
            styles.backgroundImage,
            {
              opacity: imageOpacity,
            },
          ]}
          source={{
            uri: headerImageUrl,
          }}
        />
      </Animated.View>
      <Animated.View
        style={[styles.stickyHeader, { transform: [{ translateY: headerTranslate }] }]}>
        <HeaderSelector />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: WHITE,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  stickyHeader: {
    position: 'absolute',
    top: HEADER_MAX_HEIGHT,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: STICKY_EXPANDABLE_HEADER_HEIGHT,
  },
});

export default HomeHeader;
