import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

import { BACKGROUND, LINE, WHITE } from 'theme/Colors';
import PostPreview from 'components/PostPreview';
import PostButton from 'components/PostButton';
import TopFilterBar from 'components/TopFilterBar';
import { useGetNoticePostsQuery } from 'store/services/post';
import { NoticeType } from 'types';
import { useSelector } from 'react-redux';
import SvgIcon from 'components/SvgIcon';
import { crewOnSpace } from 'assets/svg/spacers';
import { RootRouterParams } from 'types/Route';

const noticeFilter: { name: string; filterType: NoticeType }[] = [
  {
    name: '모든 글',
    filterType: 'ALL',
  },
  {
    name: '저장한 글',
    filterType: 'SAVED',
  },
  {
    name: '안 읽은 글',
    filterType: 'NREAD',
  },
];

const NoticeScreen = () => {
  const navigation = useNavigation<RootRouterParams>();
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const currentCategory = useSelector((state) => state.screen.category);

  const { data, isError, isLoading } = useGetNoticePostsQuery({
    ...(currentCategory.categoryId !== -1 && {
      postCategoryId: currentCategory.categoryId,
    }),
    type: noticeFilter[selectedFilter].filterType,
  });

  if (isLoading) return <></>;

  if (isError || !data)
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <SvgIcon xml={crewOnSpace} width={160} disabled />
      </View>
    );

  return (
    <View style={styles.container}>
      <ScrollView>
        <TopFilterBar
          items={noticeFilter.map((filter) => filter.name)}
          onIndexChange={setSelectedFilter}>
          <PostButton postingType={'notice'} />
        </TopFilterBar>
        <View style={{ backgroundColor: BACKGROUND, height: 10 }} />
        {data.posts.map((post) => (
          <PostPreview
            key={post.postId}
            header={{
              subText: { left: post.categoryName, right: post.writtenDate },
              Title: post.title,
            }}
            description={post.description}
            isSaved={post.isSaved}
            viewed={post.isRead}
            onPress={() =>
              navigation.navigate('PostDetails', {
                postType: 'notice',
                postId: post.postId,
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  topTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: LINE,
    borderBottomWidth: 1,
    backgroundColor: WHITE,
    marginBottom: 8,
  },
  topTabBarFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
});

export default NoticeScreen;
