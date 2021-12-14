import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Animated, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { firebase } from '@react-native-firebase/messaging';

import { HEADER_HEIGHT } from 'constant';
import { RootRouterParams } from 'types/Route';
import { BACKGROUND, GRAY2, WHITE } from 'theme/Colors';
import { setTabName } from 'store/slices/screen';
import { setHomeNoticePosts } from 'store/slices/posts';
import { useGetSpaceHomeQuery } from 'store/services/space';
import { setIsAdmin } from 'store/slices/auth';

import { PostPreview } from 'components/Post';
import SectionHeader from 'components/SectionHeader';
import Text from 'components/Text';
import CrewOnError from 'components/CrewOnError';
import { HEADER_MAX_HEIGHT } from './constant';
import HomeHeader from './HomeHeader';
import PinnedNoticeList from './PinnedNoticeList';
import NoneList from 'components/NoneList';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootRouterParams>();

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
    if (!isLoading && !isFetching && isSuccess && homeData) {
      dispatch(setHomeNoticePosts(homeData.newNotices));
      dispatch(setIsAdmin(homeData.isAdmin));
      setRefreshing(false);
    }
  }, [isFetching, isSuccess, isLoading]);

  if (isError || !homeData) return <CrewOnError />;
  console.log(homeData.fixedNotices);

  return (
    <View
      style={[styles.container, { ...(!homeNoticePosts.length && { backgroundColor: WHITE }) }]}>
      <Animated.ScrollView {...ScrollViewProps}>
        {homeData.fixedNotices.length !== 0 && (
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
        {homeNoticePosts.length !== 0 &&
          homeNoticePosts.map((notice) => (
            <PostPreview
              key={notice.postId}
              postId={notice.postId}
              header={{
                subText: { left: notice.categoryName, right: notice.writtenDate },
                Title: notice.title,
              }}
              image={notice.image}
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
        {homeNoticePosts.length === 0 && <NoneList />}
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
