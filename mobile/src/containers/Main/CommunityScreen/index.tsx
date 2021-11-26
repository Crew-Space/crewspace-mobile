import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { BACKGROUND, GRAY2, LINE, WHITE } from 'theme/Colors';
import Text from 'components/Text';
import PostPreview from 'components/PostPreview';
import BottomTabSafeAreaView from 'components/BottomTabSafeAreaView';
import PostButton from 'components/PostButton';
import ProfileImage from 'components/ProfileImage';
import TopFilterBar from 'components/TopFilterBar';
import HeaderCurrent from 'components/HeaderCurrent';
import { CommunityType } from 'types';
import { MemberProfilePreviewType } from 'types/Response';
import { useGetCommunityPostsQuery, useGetPostCategoriesQuery } from 'store/services/post';

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

const CommunityPostWriter = (profile: Omit<MemberProfilePreviewType, 'memberCategoryId'>) => (
  <View style={{ flexDirection: 'row', marginTop: 5 }}>
    <ProfileImage uri={profile.profileImage} width={36} style={{ marginRight: 10 }} />
    <View>
      <Text fontType={'BOLD_14'}>{profile.name}</Text>
      <Text fontType={'REGULAR_11'} color={GRAY2}>
        {profile.memberCategory}
      </Text>
    </View>
  </View>
);

const CommunityScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);

  const { data: categoriesData } = useGetPostCategoriesQuery();
  const { data: postsData } = useGetCommunityPostsQuery({
    postCategoryId: categoriesData?.communityCategories[0].categoryId,
    type: communityFilter[selectedFilter].filterType,
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
        <TopFilterBar items={categoriesData.communityCategories} onIndexChange={setSelectedFilter}>
          <PostButton postingType={'community'} />
        </TopFilterBar>
        <View style={{ backgroundColor: BACKGROUND, height: 10 }} />
        {postsData.posts.map((post) => (
          <PostPreview
            key={post.postId}
            header={{
              subText: { left: post.categoryName, right: post.writtenDate },
              Title: () =>
                CommunityPostWriter({
                  memberId: post.authorId,
                  name: post.authorName,
                  profileImage: post.authorImage,
                  memberCategory: post.authorCategoryName,
                }),
            }}
            description={post.description}
            isSaved={false}
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

export default CommunityScreen;
