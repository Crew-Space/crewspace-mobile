import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { BACKGROUND, GRAY2, LINE, WHITE } from 'theme/Colors';
import { RootRouterParams } from 'types/Route';
import Text from 'components/Text';
import PostPreview from 'components/PostPreview';
import PostButton from 'components/PostButton';
import ProfileImage from 'components/ProfileImage';
import TopFilterBar from 'components/TopFilterBar';
import { CommunityType } from 'types';
import { MemberProfilePreviewType } from 'types/Response';
import { useGetCommunityPostsQuery } from 'store/services/post';
import { useSelector } from 'react-redux';
import SvgIcon from 'components/SvgIcon';
import { crewOnSpace } from 'assets/svg/spacers';

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
  const navigation = useNavigation<RootRouterParams>();
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const currentCategory = useSelector((state) => state.screen.category);

  const { data, isError, isLoading } = useGetCommunityPostsQuery({
    ...(currentCategory.categoryId !== -1 && {
      postCategoryId: currentCategory.categoryId,
    }),
    type: communityFilter[selectedFilter].filterType,
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
          items={communityFilter.map((filter) => filter.name)}
          onIndexChange={setSelectedFilter}>
          <PostButton postingType={'community'} />
        </TopFilterBar>
        <View style={{ backgroundColor: BACKGROUND, height: 10 }} />
        {data.posts.map((post) => (
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
            onPress={() =>
              navigation.navigate('PostDetails', {
                postType: 'community',
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

export default CommunityScreen;
