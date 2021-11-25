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

const myMemberId = '1';

const members = [
  {
    name: '곽은아',
    memberId: '1',
    profileImage: 'https://blog.kakaocdn.net/dn/IKDPO/btqU3oZ8nv9/3nkhB9jPjfUEwCMI6ywIk1/img.jpg',
    memberCategory: '운영진',
  },
  {
    name: '김은경',
    memberId: '2',
    profileImage: 'https://blog.kakaocdn.net/dn/IKDPO/btqU3oZ8nv9/3nkhB9jPjfUEwCMI6ywIk1/img.jpg',
    memberCategory: '기획팀',
  },
  {
    name: '나은혜',
    memberId: '3',
    profileImage: 'https://blog.kakaocdn.net/dn/IKDPO/btqU3oZ8nv9/3nkhB9jPjfUEwCMI6ywIk1/img.jpg',
    memberCategory: '개발팀',
  },
  {
    name: '박지은',
    memberId: '4',
    profileImage: 'https://blog.kakaocdn.net/dn/IKDPO/btqU3oZ8nv9/3nkhB9jPjfUEwCMI6ywIk1/img.jpg',
    memberCategory: '디자인팀',
  },
];

const MemberListScreen = () => {
  const navigation = useNavigation<RootRouterParams>();
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const myProfile = members.find((member) => member.memberId === myMemberId);

  const onProfilePress = (member) =>
    navigation.navigate('MemberProfileDetails', {
      memberId: member.memberId,
    });

  return (
    <BottomTabSafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text fontType={'BOLD_18'} style={{ marginRight: 6 }}>
            회원
          </Text>
          <Text fontType={'REGULAR_14'} color={PRIMARY}>
            {members.length}명
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
        items={['전체', '운영진', '기획팀', '디자인팀', '개발팀']}
        onIndexChange={setSelectedItem}
      />
      <ScrollView>
        {myProfile && <MemberProfilePreview me {...myProfile} onPress={onProfilePress} />}
        <View style={{ backgroundColor: BACKGROUND, height: 10 }} />
        {members
          .filter((member) => member.memberId != myMemberId)
          .map((member) => (
            <MemberProfilePreview {...member} onPress={onProfilePress} />
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
