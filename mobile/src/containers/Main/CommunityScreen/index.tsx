import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { crewOnSpace } from 'assets/svg/spacers';
import { CommunityType } from 'types';
import { RootRouterParams } from 'types/Route';
import { BACKGROUND, LINE, WHITE } from 'theme/Colors';
import { postApi, useGetCommunityPostsQuery } from 'store/services/post';
import PostPreview from 'components/PostPreview';
import PostButton from 'components/PostButton';
import TopFilterBar from 'components/TopFilterBar';
import SvgIcon from 'components/SvgIcon';
import CommunityPostAuthor from 'components/CommunityPostAuthor';
import Text from 'components/Text';
import { resetCommunityPosts, setCommunityPosts } from 'store/slices/posts';

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

  const { data, refetch, isError, isLoading, isSuccess, isFetching } = useGetCommunityPostsQuery({
    ...(currentCategory.categoryId !== -1 && {
      postCategoryId: currentCategory.categoryId,
    }),
    ...(offset.current !== -1 && {
      offset: offset.current + 1,
    }),
    type: communityFilter[selectedFilter].filterType,
  });

  useEffect(() => {
    offset.current = -1;
    dispatch(resetCommunityPosts());
    refetch();
  }, [selectedFilter, currentCategory]);

  useEffect(() => {
    if (!isLoading && !isFetching && isSuccess && data) {
      dispatch(setCommunityPosts(data.posts));
    }
  }, [isFetching, isSuccess, isLoading]);

  if (isLoading) return <></>;

  if (isError || !data)
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <SvgIcon xml={crewOnSpace} width={160} disabled />
        <Text>무언가 잘못되었어요...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <TopFilterBar
        items={communityFilter.map((filter) => filter.name)}
        onIndexChange={(index) => {
          setSelectedFilter(index);
        }}>
        <PostButton postingType={'community'} />
      </TopFilterBar>
      <View style={{ backgroundColor: BACKGROUND, height: 10 }} onTouchEnd={() => refetch()} />
      <FlatList
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
            description={item.description.replaceAll('\n', '')}
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

export default CommunityScreen;
