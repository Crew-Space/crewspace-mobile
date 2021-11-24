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
import HeaderSelector from 'components/HeaderSelector';
import { MemberProfilePreview } from 'types';

const CommunityPostWriter = (profile: MemberProfilePreview) => (
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
  const [selectedItem, setSelectedItem] = useState<number>(0);

  return (
    <BottomTabSafeAreaView style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]}>
        <HeaderSelector data={[{ name: '커뮤니티 전체', id: 1 }]} />
        <TopFilterBar items={['모든 글', '저장한 글']} onIndexChange={setSelectedItem}>
          <PostButton postingType={'community'} />
        </TopFilterBar>
        <View style={{ backgroundColor: BACKGROUND, height: 10 }} />
        {Array.from('-'.repeat(10)).map((_, index) => (
          <PostPreview
            key={index}
            header={{
              subText: { left: '과제 공지', right: '10분 전' },
              Title: () =>
                CommunityPostWriter({
                  memberId: '1',
                  name: '김수한',
                  profileImage:
                    'https://blog.kakaocdn.net/dn/IKDPO/btqU3oZ8nv9/3nkhB9jPjfUEwCMI6ywIk1/img.jpg',
                  memberCategory: '디자인팀',
                }),
            }}
            description={
              '안녕하세요 :) 1차 과제 마감 관련하여 공지드립니다. 사전에 고지드린대로 인당 3개씩 아이디어 조사하여, 간단히 PPT 자료 제작해오시면 될 것 같습니다. 궁금한 점 언제든 문의...'
            }
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
