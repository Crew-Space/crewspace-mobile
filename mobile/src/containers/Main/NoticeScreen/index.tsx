import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

import { BACKGROUND, LINE, WHITE } from 'theme/Colors';
import PostPreview from 'components/PostPreview';
import PostButton from 'components/PostButton';
import TopFilterBar from 'components/TopFilterBar';
import { useGetNoticePostsQuery } from 'store/services/post';
import { NoticeType } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import SvgIcon from 'components/SvgIcon';
import { crewOnSpace } from 'assets/svg/spacers';
import { RootRouterParams } from 'types/Route';
import { resetNoticePosts, setNoticePosts } from 'store/slices/posts';
import CrewOnError from 'components/CrewOnError';

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
  const dispatch = useDispatch();

  const currentCategory = useSelector((state) => state.screen.category);
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const noticePosts = useSelector((state) => state.posts.noticePosts);
  const offset = useRef(-1);

  const { data, refetch, isError, isLoading, isSuccess, isFetching } = useGetNoticePostsQuery({
    ...(currentCategory.categoryId !== -1 && {
      postCategoryId: currentCategory.categoryId,
    }),
    ...(offset.current !== -1 && {
      offset: offset.current + 1,
    }),
    type: noticeFilter[selectedFilter].filterType,
  });

  useEffect(() => {
    offset.current = -1;
    dispatch(resetNoticePosts());
    refetch();
  }, [selectedFilter, currentCategory]);

  useEffect(() => {
    if (!isLoading && !isFetching && isSuccess && data) {
      dispatch(setNoticePosts(data.posts));
    }
  }, [isFetching, isSuccess, isLoading]);

  if (isLoading) return <></>;

  if (isError || !data) <CrewOnError />;

  return (
    <View style={styles.container}>
      <TopFilterBar
        items={noticeFilter.map((filter) => filter.name)}
        onIndexChange={setSelectedFilter}>
        {false && <PostButton postingType={'notice'} />}
      </TopFilterBar>
      <View style={{ backgroundColor: BACKGROUND, height: 10 }} />

      <FlatList
        data={noticePosts}
        extraData={noticePosts}
        renderItem={({ item }) => (
          <PostPreview
            postId={item.postId}
            key={item.postId}
            header={{
              subText: { left: item.categoryName, right: item.writtenDate },
              Title: item.title,
            }}
            description={item.description.replaceAll('\n', '')}
            isSaved={item.isSaved}
            viewed={item.isRead}
            onPress={() =>
              navigation.navigate('PostDetails', {
                postType: 'notice',
                postId: item.postId,
              })
            }
          />
        )}
        onEndReached={() => {
          offset.current = data.offset;
          refetch();
        }}
        onEndReachedThreshold={1}
      />
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
