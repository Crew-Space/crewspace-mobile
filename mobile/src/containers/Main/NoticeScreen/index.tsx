import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { BACKGROUND, LINE, WHITE } from 'theme/Colors';
import Text from 'components/Text';
import PostPreview from 'components/PostPreview';
import BottomTabSafeAreaView from 'components/BottomTabSafeAreaView';
import PostButton from 'components/PostButton';
import TopFilterBar from 'components/TopFilterBar';

const NoticeScreen = () => {
  const [selectedItem, setSelectedItem] = useState<number>(0);

  return (
    <BottomTabSafeAreaView style={styles.container}>
      <View>
        <ScrollView>
          <Text>Header</Text>
          <TopFilterBar
            items={['모든 글', '저장한 글', '안 읽은 글']}
            onIndexChange={setSelectedItem}>
            <PostButton postingType={'notice'} />
          </TopFilterBar>
          {Array.from('-'.repeat(10)).map((_, index) => (
            <PostPreview
              key={index}
              header={{
                subText: { left: '과제 공지', right: '10분 전' },
                Title: '1차 과제 마감 안내',
              }}
              description={
                '안녕하세요 :) 1차 과제 마감 관련하여 공지드립니다. 사전에 고지드린대로 인당 3개씩 아이디어 조사하여, 간단히 PPT 자료 제작해오시면 될 것 같습니다. 궁금한 점 언제든 문의...'
              }
              isSaved={false}
              viewed={false}
            />
          ))}
        </ScrollView>
      </View>
    </BottomTabSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
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
