import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

import { POST_ALL_ID } from 'constant';
import { BACKGROUND, LINE, WHITE } from 'theme/Colors';
import { NoticeType } from 'types';
import { RootRouterParams } from 'types/Route';
import { postApi, useGetNoticePostsQuery } from 'store/services/post';
import { addNoticePosts, resetNoticePosts } from 'store/slices/posts';

import { PostPreview } from 'components/Post';
import { PostButton } from 'components/Button';
import TopFilterBar from 'components/TopFilterBar';
import CrewOnError from 'components/CrewOnError';
import NoneList from 'components/NoneList';

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
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const offset = useRef(-1);

  const { data, refetch, isError, isSuccess, isFetching } = useGetNoticePostsQuery({
    ...(currentCategory.categoryId !== POST_ALL_ID && {
      postCategoryId: currentCategory.categoryId,
    }),
    ...(offset.current !== -1 && {
      offset: offset.current + 1,
    }),
    type: noticeFilter[selectedFilter].filterType,
  });

  useEffect(() => {
    if (!isFetching && isSuccess && data) {
      dispatch(addNoticePosts(data.posts));
    }
  }, [isFetching, isSuccess]);

  useEffect(() => {
    offset.current = -1;
    dispatch(resetNoticePosts());
    refetch();
  }, [selectedFilter, currentCategory]);

  if (isError || !data) return <CrewOnError />;

  return (
    <View style={styles.container}>
      <TopFilterBar
        items={noticeFilter.map((filter) => filter.name)}
        onIndexChange={(index) => {
          offset.current = -1;
          dispatch(postApi.util.invalidateTags(['NoticePost']));
          setSelectedFilter(index);
        }}>
        {isAdmin && <PostButton postType={'notice'} />}
      </TopFilterBar>
      {noticePosts.length !== 0 ? (
        <FlatList
          data={noticePosts}
          extraData={noticePosts}
          contentContainerStyle={styles.flatContentContainerStyle}
          renderItem={({ item }) => (
            <PostPreview
              postId={item.postId}
              key={item.postId}
              header={{
                subText: { left: item.categoryName, right: item.writtenDate },
                Title: item.title,
              }}
              image={item.image}
              description={item.description?.replace(/\n/g, '')}
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
      ) : (
        <NoneList />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  flatContentContainerStyle: {
    backgroundColor: BACKGROUND,
    paddingTop: 10,
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
