import React, { useEffect, useState } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';

import { camera, plus, search } from 'assets/svg/icons';
import { BLACK, BLACK_LIGHT, WHITE } from 'theme/Colors';
import { HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE } from './constant';
import { HEADER_HEIGHT } from 'constant';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'theme/Metrics';
import HeaderCurrent from 'containers/Main/HomeScreen/HeaderCurrent';
import { useNavigation } from '@react-navigation/core';
import { RootRouterParams } from 'types/Route';
import { spaceApi, useEditBannerMutation, useGetMySpacesQuery } from 'store/services/space';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSpace } from 'store/slices/space';
import SvgIcon from 'components/SvgIcon';
import { launchImageLibrary } from 'react-native-image-picker';

interface Props {
  scrollYState: Animated.Value;
  headerImageUrl: string;
}

const HomeHeader = ({ scrollYState, headerImageUrl }: Props) => {
  const navigation = useNavigation<RootRouterParams>();
  const dispatch = useDispatch();
  const space = useSelector((state) => state.space.current);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const { data, isFetching, isError, isSuccess, isLoading } = useGetMySpacesQuery();
  const [editBanner] = useEditBannerMutation();

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

  const onChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, (response) => {
      if (response && response.assets) {
        editBanner({
          uri: response.assets[0].uri!,
          type: response.assets[0].type!,
          name: response.assets[0].fileName!,
        });
        spaceApi.util.invalidateTags(['HomeNotice']);
      }
    });
  };

  useEffect(() => {
    if (!isLoading && !isFetching && isSuccess && data) {
      const cur = data.spaces.find((s) => s.spaceId === space.spaceId);
      if (!cur) {
        dispatch(setCurrentSpace(data.spaces[0]));
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
        {isAdmin && (
          <View
            style={{
              position: 'absolute',
              width: 30,
              height: 30,
              bottom: 12,
              right: 12,
            }}>
            <SvgIcon xml={camera} width={30} onPress={onChoosePhoto} />
          </View>
        )}
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
