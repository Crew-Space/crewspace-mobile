import React from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';

import { search } from 'assets/svg/icons';
import { BLACK, WHITE } from 'theme/Colors';
import { HeaderListItemType } from 'types';
import {
  HEADER_MAX_HEIGHT,
  HEADER_SCROLL_DISTANCE,
  STICKY_EXPANDABLE_HEADER_HEIGHT,
} from './constant';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'theme/Metrics';
import ProfileImage from 'components/ProfileImage';
import Text from 'components/Text';
import HeaderSelector from 'components/HeaderSelector';

const spaces = [
  { name: '해커리어', id: 1 },
  { name: 'SOPT', id: 2 },
  { name: '디프만', id: 3 },
  { name: 'SPACER', id: 4 },
];

interface Props {
  scrollYState: Animated.Value;
  headerImageUrl: string;
}

interface HeaderItemProps {
  space: HeaderListItemType;
}

const HeaderItem = ({ space }: HeaderItemProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: WHITE,
        paddingVertical: 18,
        paddingHorizontal: 20,
      }}>
      <ProfileImage
        uri={'https://blog.kakaocdn.net/dn/IKDPO/btqU3oZ8nv9/3nkhB9jPjfUEwCMI6ywIk1/img.jpg'}
        width={24}
        style={{ marginRight: 8 }}
      />
      <Text fontType={'BOLD_18'}>{space.name}</Text>
    </View>
  );
};

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
      {/* <View style={[styles.background]} /> */}
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
        <HeaderSelector
          data={spaces}
          leftButton={{ xml: search, onPress: () => console.log('leftButton pressed') }}
        />
      </Animated.View>
      {/* <Animated.View
        style={[
          styles.headerList,
          { height: STICKY_EXPANDABLE_HEADER_HEIGHT * (spaces.length - 1) },
        ]}>
        {spaces.map((space) => (
          <HeaderItem key={space.id} space={space} />
        ))}
      </Animated.View> */}
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
    zIndex: 10,
  },
  headerList: {
    position: 'absolute',
    top: HEADER_MAX_HEIGHT + STICKY_EXPANDABLE_HEADER_HEIGHT - 2,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: STICKY_EXPANDABLE_HEADER_HEIGHT,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: BLACK,
    opacity: 0.6,
  },
});

export default HomeHeader;
