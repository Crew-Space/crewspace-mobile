import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Animated, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { RootRouterParams } from 'types/Route';
import { GRAY2, WHITE } from 'theme/Colors';
import PostPreview from 'components/PostPreview';
import PinnedNoticeList from './PinnedNoticeList';
import SectionHeader from 'components/SectionHeader';
import HomeHeader from './HomeHeader';
import { HEADER_MAX_HEIGHT, STICKY_EXPANDABLE_HEADER_HEIGHT } from './constant';
import Text from 'components/Text';
import { useGetSpaceHomeQuery } from 'store/services/space';
import { setTabName } from 'store/slices/screen';

const HomeScreen = () => {
  const navigation = useNavigation<RootRouterParams>();
  const dispatch = useDispatch();
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
          setTimeout(() => setRefreshing(false), 1000);
        }}
        progressViewOffset={HEADER_MAX_HEIGHT + STICKY_EXPANDABLE_HEADER_HEIGHT}
      />
    ),
    contentInset: {
      top: HEADER_MAX_HEIGHT + STICKY_EXPANDABLE_HEADER_HEIGHT,
    },
    contentOffset: {
      x: 0,
      y: -HEADER_MAX_HEIGHT,
    },
  };

  const { data: homeData } = useGetSpaceHomeQuery();

  if (!homeData) return <></>;

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
              {'더보기'}
            </Text>
          </TouchableOpacity>
        </SectionHeader>
        {homeData.newNotices.map((notice) => (
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
    backgroundColor: WHITE,
  },
});

export default HomeScreen;
