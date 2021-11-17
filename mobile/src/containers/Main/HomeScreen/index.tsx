import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { BACKGROUND, GRAY2, LINE, WHITE } from 'theme/Colors';
import Text from 'components/Text';
import PinnedNotice from './PinnedNotice';
import PostPreview from 'components/PostPreview';
import BottomTabSafeAreaView from 'components/BottomTabSafeAreaView';

const HomeScreen = () => {
  return (
    <BottomTabSafeAreaView style={styles.container}>
      <View>
        <ScrollView>
          <Text>Header</Text>
          <FlatList
            horizontal
            contentContainerStyle={{
              paddingVertical: 17,
              paddingHorizontal: 15,
              backgroundColor: BACKGROUND,
            }}
            data={Array.from('-'.repeat(6))}
            renderItem={() => (
              <PinnedNotice
                header={{
                  subText: {
                    left: '일반 공지',
                    right: '2021.10.14(금)',
                  },
                  title: '10월 3차 오프 모임 안내',
                }}
              />
            )}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 19,
              paddingHorizontal: 20,
              borderBottomColor: LINE,
              borderBottomWidth: 1,
              backgroundColor: WHITE,
            }}>
            <Text fontType={'BOLD_18'}>최근 공지</Text>
            <Text fontType={'REGULAR_14'} color={GRAY2}>
              더 보기
            </Text>
          </View>
          {Array.from('-'.repeat(10)).map(() => (
            <PostPreview
              header={{
                subText: { left: '과제 공지', right: '10분 전' },
                title: '1차 과제 마감 안내',
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
});

export default HomeScreen;
