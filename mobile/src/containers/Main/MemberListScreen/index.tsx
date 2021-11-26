import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { BACKGROUND, LINE, PRIMARY, WHITE } from 'theme/Colors';
import { search } from 'assets/svg/icons';
import { normalize } from 'utils';
import { RootRouterParams } from 'types/Route';
import BottomTabSafeAreaView from 'components/BottomTabSafeAreaView';
import Text from 'components/Text';
import TopFilterBar from 'components/TopFilterBar';
import SvgIcon from 'components/SvgIcon';
import MemberProfilePreview from 'components/MemberProfilePreview';
import { useGetMemberCategoriesQuery, useGetMembersQuery } from 'store/services/member';
import { MemberProfilePreviewType } from 'types/Response';

const MemberListScreen = () => {
  const navigation = useNavigation<RootRouterParams>();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const { data: categoriesData } = useGetMemberCategoriesQuery();
  const { data: membersData } = useGetMembersQuery({
    ...(selectedCategory !== 0 && {
      memberCategoryId: categoriesData
        ? categoriesData.memberCategories[selectedCategory - 1].categoryId
        : -1,
    }),
  });

  const myProfile = membersData?.members.find(
    (member) => member.memberId === categoriesData?.myMemberId,
  );

  const onProfilePress = (member: MemberProfilePreviewType) =>
    navigation.navigate('MemberProfileDetails', {
      memberId: member.memberId,
    });

  if (!membersData || !categoriesData) return <></>;

  return (
    <BottomTabSafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text fontType={'BOLD_18'} style={{ marginRight: 6 }}>
            회원
          </Text>
          <Text fontType={'REGULAR_14'} color={PRIMARY}>
            {categoriesData.numOfMember}명
          </Text>
        </View>
        <SvgIcon
          xml={search}
          width={normalize(24)}
          onPress={() =>
            navigation.navigate('Search', {
              searchType: 'member',
            })
          }
        />
      </View>
      <TopFilterBar
        items={[{ categoryName: '전체', categoryId: -1 }, ...categoriesData.memberCategories]}
        onIndexChange={setSelectedCategory}
      />
      <ScrollView>
        {myProfile && (
          <MemberProfilePreview me {...myProfile} onPress={() => onProfilePress(myProfile)} />
        )}
        <View style={{ backgroundColor: BACKGROUND, height: 10 }} />
        {membersData.members
          .filter((member) => member.memberId !== categoriesData.myMemberId)
          .map((member) => (
            <MemberProfilePreview
              key={member.memberId}
              {...member}
              onPress={() => onProfilePress(member)}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
});

export default MemberListScreen;
