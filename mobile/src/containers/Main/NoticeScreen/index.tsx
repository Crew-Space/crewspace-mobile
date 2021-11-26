import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { BACKGROUND, LINE, WHITE } from 'theme/Colors';
import PostPreview from 'components/PostPreview';
import BottomTabSafeAreaView from 'components/BottomTabSafeAreaView';
import PostButton from 'components/PostButton';
import TopFilterBar from 'components/TopFilterBar';
import HeaderCurrent from 'components/HeaderCurrent';
import { useGetNoticePostsQuery, useGetPostCategoriesQuery } from 'store/services/post';
import { NoticeType } from 'types';

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
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);

  const { data: categoriesData } = useGetPostCategoriesQuery();
  const { data: postsData } = useGetNoticePostsQuery({
    postCategoryId: categoriesData?.noticeCategories[0].categoryId,
    type: noticeFilter[selectedFilter].filterType,
  });

  if (!postsData || !categoriesData) return <></>;

  return (
    <BottomTabSafeAreaView style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]}>
        <HeaderCurrent
          data={{
            name: categoriesData.noticeCategories[0].categoryName || '',
            id: selectedCategory,
          }}
        />
        <TopFilterBar items={categoriesData.noticeCategories} onIndexChange={setSelectedFilter}>
          <PostButton postingType={'notice'} />
        </TopFilterBar>
        <View style={{ backgroundColor: BACKGROUND, height: 10 }} />
        {postsData.posts.map((post) => (
          <PostPreview
            key={post.postId}
            header={{
              subText: { left: post.categoryName, right: post.writtenDate },
              Title: post.title,
            }}
            description={post.description}
            isSaved={post.isSaved}
            viewed={post.isRead}
          />
        ))}
      </ScrollView>
    </BottomTabSafeAreaView>
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
