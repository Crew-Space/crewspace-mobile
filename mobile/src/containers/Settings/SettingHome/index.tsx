import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BACKGROUND, GRAY2, LINE, PRIMARY, WHITE } from 'theme/Colors';
import { ItemType } from 'types/component';
import Text from 'components/Text';
import BottomTabSafeAreaView from 'components/BottomTabSafeAreaView';
import { SectionList } from 'components/List';
import TouchableText from 'components/TouchableText';

const SettingHome = () => {
  const [alarmAll, setAlarmAll] = useState(true);
  const [alarmNotice, setAlarmNotice] = useState(true);
  const [alarmMyNotice, setAlarmMyNotice] = useState(false);
  const [alarmCommunity, setAlarmCommunity] = useState(false);

  const basicSettings: ItemType[] = [
    {
      text: '계정 정보',
      fontType: 'BOLD_16',
    },
    {
      text: '동아리 설정',
      fontType: 'BOLD_16',
    },
  ];

  const alramSettings: ItemType[] = [
    {
      text: '전체 알림',
      toggle: {
        onValueChange: setAlarmAll,
        value: alarmAll,
        trackColor: {
          true: PRIMARY,
        },
      },
    },
    {
      text: '공지 알림',
      toggle: {
        onValueChange: setAlarmNotice,
        value: alarmNotice,
        trackColor: {
          true: PRIMARY,
        },
      },
    },
    {
      text: '내 공지 알림',
      toggle: {
        onValueChange: setAlarmMyNotice,
        value: alarmMyNotice,
        trackColor: {
          true: PRIMARY,
        },
      },
    },
    {
      text: '커뮤니티 알림',
      toggle: {
        onValueChange: setAlarmCommunity,
        value: alarmCommunity,
        trackColor: {
          true: PRIMARY,
        },
      },
    },
  ];

  const infoSettings: ItemType[] = [
    {
      text: '리뷰 쓰기',
    },
    {
      text: '의견 보내기',
    },
    {
      text: '서비스 이용약관',
    },
    {
      text: '개인정보 처리방침',
    },
  ];

  return (
    <BottomTabSafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text fontType={'BOLD_18'} style={{ marginRight: 6 }}>
          설정
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <SectionList data={basicSettings} />
        <SectionList sectionTitle={'알림 설정'} data={alramSettings} />
        <SectionList sectionTitle={'지원/정보'} data={infoSettings} />
        <View style={styles.withdrawal}>
          <TouchableText
            fontType={'REGULAR_14'}
            color={GRAY2}
            style={{ textDecorationLine: 'underline' }}>
            동아리 탈퇴
          </TouchableText>
        </View>
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
    justifyContent: 'flex-start',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    backgroundColor: WHITE,
  },
  scrollView: {
    backgroundColor: BACKGROUND,
  },
  withdrawal: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingHome;
