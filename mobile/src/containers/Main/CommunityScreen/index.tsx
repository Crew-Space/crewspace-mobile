import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { CommunityType } from 'types';
import { RootRouterParams } from 'types/Route';
import { BACKGROUND, LINE, WHITE } from 'theme/Colors';
import { postApi, useGetCommunityPostsQuery } from 'store/services/post';
import { resetCommunityPosts, addCommunityPosts } from 'store/slices/posts';

import { PostButton } from 'components/Button';
import TopFilterBar from 'components/TopFilterBar';
import { CommunityPostAuthor, PostPreview } from 'components/Post';
import CrewOnError from 'components/CrewOnError';
import { POST_ALL_ID } from 'constant';

const communityFilter: { name: string; filterType: CommunityType }[] = [
  {
    name: '모든 글',
    filterType: 'ALL',
  },
  {
    name: '저장한 글',
    filterType: 'SAVED',
  },
];

const CommunityScreen = () => {
  const navigation = useNavigation<RootRouterParams>();
  const dispatch = useDispatch();

  const currentCategory = useSelector((state) => state.screen.category);
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const communityPosts = useSelector((state) => state.posts.communityPosts);
  const offset = useRef(-1);

  const { data, refetch, isError, isSuccess, isFetching } = useGetCommunityPostsQuery({
    ...(currentCategory.categoryId !== POST_ALL_ID && {
      postCategoryId: currentCategory.categoryId,
    }),
    ...(offset.current !== -1 && {
      offset: offset.current + 1,
    }),
    type: communityFilter[selectedFilter].filterType,
  });

  useEffect(() => {
    if (!isFetching && isSuccess && data) {
      dispatch(addCommunityPosts(data.posts));
    }
  }, [isSuccess, isFetching]);

  useEffect(() => {
    offset.current = -1;
    dispatch(resetCommunityPosts());
    refetch();
  }, [selectedFilter, currentCategory]);

  if (isError || !data) return <CrewOnError />;

  return (
    <View style={styles.container}>
      <TopFilterBar
        items={communityFilter.map((filter) => filter.name)}
        onIndexChange={(index) => {
          offset.current = -1;
          dispatch(postApi.util.invalidateTags(['CommunityPost']));
          setSelectedFilter(index);
        }}>
        <PostButton postType={'community'} />
      </TopFilterBar>
      <FlatList
        contentContainerStyle={styles.flatContentContainerStyle}
        data={communityPosts}
        extraData={communityPosts}
        renderItem={({ item }) => (
          <PostPreview
            key={item.postId}
            postId={item.postId}
            header={{
              subText: { left: item.categoryName, right: item.writtenDate },
              Title: () =>
                CommunityPostAuthor({
                  memberId: item.authorId,
                  name: item.authorName,
                  profileImage: item.authorImage,
                  memberCategory: item.authorCategoryName,
                }),
            }}
            image={item.image}
            description={item.description?.replace(/\n/g, '')}
            isSaved={item.isSaved}
            onPress={() =>
              navigation.navigate('PostDetails', {
                postType: 'community',
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

export default CommunityScreen;
