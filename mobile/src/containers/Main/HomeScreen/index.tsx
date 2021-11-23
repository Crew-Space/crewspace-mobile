import React, { useRef, useState } from 'react';
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

const HomeScreen = () => {
  const navigation = useNavigation<RootRouterParams>();
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

  return (
    <View style={styles.container}>
      <Animated.ScrollView {...ScrollViewProps}>
        <PinnedNoticeList
          data={[
            {
              subText: {
                left: '일반 공지',
                right: '2021.10.14(금)',
              },
              Title: '10월 3차 오프 모임 안내',
            },
          ]}
        />
        <SectionHeader text={'최근 공지'}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Main', {
                screen: 'Notice',
              })
            }>
            <Text fontType={'REGULAR_14'} color={GRAY2}>
              {'더보기'}
            </Text>
          </TouchableOpacity>
        </SectionHeader>
        {Array.from('-'.repeat(10)).map(() => (
          <PostPreview
            header={{
              subText: { left: '과제 공지', right: '10분 전' },
              Title: '1차 과제 마감 안내',
            }}
            description={
              '안녕하세요 :) 1차 과제 마감 관련하여 공지드립니다. 사전에 고지드린대로 인당 3개씩 아이디어 조사하여, 간단히 PPT 자료 제작해오시면 될 것 같습니다. 궁금한 점 언제든 문의...'
            }
            isSaved={false}
            viewed={false}
          />
        ))}
      </Animated.ScrollView>

      <HomeHeader
        scrollYState={scrollYState}
        headerImageUrl={
          'https://opgg-com-image.akamaized.net/attach/images/20210308225137.861310.jpg'
        }
      />
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
