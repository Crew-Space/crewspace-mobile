import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Animated, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ASYNC_STORAGE_KEY } from 'constant/AsyncStorage';
import { HEADER_HEIGHT } from 'constant';
import { RootRouterParams } from 'types/Route';
import { BACKGROUND, GRAY2 } from 'theme/Colors';
import { setTabName } from 'store/slices/screen';
import { setSpace } from 'store/slices/space';
import { setHomeNoticePosts } from 'store/slices/posts';
import { useGetMySpacesQuery, useGetSpaceHomeQuery } from 'store/services/space';
import PostPreview from 'components/PostPreview';
import SectionHeader from 'components/SectionHeader';
import Text from 'components/Text';
import { HEADER_MAX_HEIGHT } from './constant';
import CrewOnError from 'components/CrewOnError';
import HomeHeader from './HomeHeader';
import PinnedNoticeList from './PinnedNoticeList';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootRouterParams>();
  const spaceId = useSelector((state) => state.space.spaceId);
  const {
    data: spacesData,
    isError: spacesError,
    isLoading: spacesLoading,
    isSuccess: spacesSuccess,
    isFetching: spacesFetching,
  } = useGetMySpacesQuery();

  const homeNoticePosts = useSelector((state) => state.posts.homeNoticePosts);
  const {
    data: homeData,
    refetch,
    isError,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetSpaceHomeQuery();

  const scrollYState = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);

  const ScrollViewProps = {
    scrollEventThrottle: 16,
    onScroll: Animated.event([{ nativeEvent: { contentOffset: { y: scrollYState } } }], {
      useNativeDriver: true,
    }),
    refreshControl: (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          refetch();
        }}
        progressViewOffset={HEADER_MAX_HEIGHT + HEADER_HEIGHT}
      />
    ),
    contentInset: {
      top: HEADER_MAX_HEIGHT + HEADER_HEIGHT,
    },
    contentOffset: {
      x: 0,
      y: -HEADER_MAX_HEIGHT,
    },
  };

  useEffect(() => {
    if (!spacesLoading && !spacesSuccess && spacesFetching && spacesData) {
      const cur =
        spacesData.spaces.find((space) => space.spaceId === spaceId) || spacesData.spaces[0];
      AsyncStorage.setItem(ASYNC_STORAGE_KEY.SPACE_ID, cur.spaceId.toString());
      dispatch(setSpace(cur));
    }
  }, [spacesLoading, spacesSuccess, spacesFetching]);

  useEffect(() => {
    if (!isLoading && !isFetching && isSuccess && homeData) {
      dispatch(setHomeNoticePosts(homeData.newNotices));
      setRefreshing(false);
    }
  }, [isFetching, isSuccess, isLoading]);

  if (isLoading) return <></>;
  if (isError || !homeData) return <CrewOnError />;
  console.log(homeData);

  return (
    <View style={styles.container}>
      <Animated.ScrollView {...ScrollViewProps}>
        {!!homeData.fixedNotices.length && (
          <PinnedNoticeList
            data={homeData.fixedNotices.map((notice) => ({
              subText: {
                left: notice.categoryName,
                right: notice.writtenDate,
              },
              Title: notice.title,
              postId: notice.postId,
            }))}
          />
        )}
        <SectionHeader text={'최근 공지'}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setTabName('Notice'));
              navigation.navigate('Main', {
                screen: 'Notice',
              });
            }}>
            <Text fontType={'REGULAR_14'} color={GRAY2}>
              {'더 보기'}
            </Text>
          </TouchableOpacity>
        </SectionHeader>
        {homeNoticePosts.map((notice) => (
          <PostPreview
            key={notice.postId}
            postId={notice.postId}
            header={{
              subText: { left: notice.categoryName, right: notice.writtenDate },
              Title: notice.title,
            }}
            description={notice.description}
            isSaved={notice.isSaved}
            viewed={notice.isRead}
            onPress={() =>
              navigation.navigate('PostDetails', {
                postType: 'notice',
                postId: notice.postId,
              })
            }
          />
        ))}
      </Animated.ScrollView>
      <HomeHeader scrollYState={scrollYState} headerImageUrl={homeData.bannerImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  currentItemContainer: {
    zIndex: 1,
  },
});

export default HomeScreen;
