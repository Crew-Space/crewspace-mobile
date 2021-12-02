import React, { useEffect } from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';

import { search } from 'assets/svg/icons';
import { BLACK, WHITE } from 'theme/Colors';
import { HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE } from './constant';
import { HEADER_HEIGHT } from 'constant';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'theme/Metrics';
import HeaderCurrent from 'components/HeaderCurrent';
import { useNavigation } from '@react-navigation/core';
import { RootRouterParams } from 'types/Route';
import { useGetMySpacesQuery } from 'store/services/space';
import { useDispatch, useSelector } from 'react-redux';
import { setSpace } from 'store/slices/space';

interface Props {
  scrollYState: Animated.Value;
  headerImageUrl: string;
}

const HomeHeader = ({ scrollYState, headerImageUrl }: Props) => {
  const navigation = useNavigation<RootRouterParams>();
  const dispatch = useDispatch();
  const space = useSelector((state) => state.space);
  const { data, isFetching, isError, isSuccess, isLoading } = useGetMySpacesQuery();

  const scrollY = Animated.add(
    scrollYState,
    Platform.OS === 'ios' ? HEADER_MAX_HEIGHT + HEADER_HEIGHT : 0,
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

  useEffect(() => {
    if (!isLoading && !isFetching && isSuccess && data) {
      const cur = data.spaces.find((s) => s.spaceId === space.spaceId);
      if (!cur) {
        dispatch(setSpace(data.spaces[0]));
      }
    }
  }, [isFetching, isSuccess, isLoading]);

  if (isError || !data) return <></>;

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
        <HeaderCurrent
          data={{
            name: space.spaceName,
            id: space.spaceId,
            imageUrl: space.spaceImage,
          }}
          leftButton={{
            xml: search,
            onPress: () =>
              navigation.navigate('Search', {
                searchType: 'post',
              }),
          }}
        />
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
    height: HEADER_HEIGHT,
    zIndex: 10,
  },
  headerList: {
    position: 'absolute',
    top: HEADER_MAX_HEIGHT + HEADER_HEIGHT,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: HEADER_HEIGHT,
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
