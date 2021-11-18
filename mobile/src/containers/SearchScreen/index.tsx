import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';

import { BACKGROUND, BLACK, GRAY2, GRAY3, GRAY5, LINE, WHITE } from 'theme/Colors';
import Text from 'components/Text';
import { RootRouterParams } from 'types/Route';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import TopFilterBar from 'components/TopFilterBar';
import { SvgXml } from 'react-native-svg';
import { close, search } from 'assets/svg/icons';

const SearchScreen = () => {
  const navigation = useNavigation<RootRouterParams>();
  const recentSearchKeywords = ['오프', '공지', '디자인'];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'top', 'right']}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder={'공지, 커뮤니티 게시글 검색'}
          style={{
            flex: 1,
            backgroundColor: GRAY5,
            paddingTop: 12,
            paddingBottom: 11,
            paddingHorizontal: 20,
            borderRadius: 8,
          }}
        />
        <Text fontType={'BOLD_16'} style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
          취소
        </Text>
      </View>
      <TopFilterBar items={['전체', '공지', '커뮤니티']} onIndexChange={() => console.log()} />
      <View style={styles.searchResult}>
        {!recentSearchKeywords.length ? (
          <Text fontType={'REGULAR_14'} color={GRAY2} style={styles.noSearchKeyword}>
            최근 검색어가 없어요
          </Text>
        ) : (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
                backgroundColor: WHITE,
              }}>
              <Text fontType={'REGULAR_14'} color={GRAY2}>
                최근 검색어
              </Text>
              <Text fontType={'REGULAR_14'} color={BLACK}>
                전체 삭제
              </Text>
            </View>
            <ScrollView>
              {recentSearchKeywords.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: LINE,
                    backgroundColor: WHITE,
                  }}>
                  <SvgXml xml={search} width={24} fill={GRAY3} />
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text fontType={'REGULAR_16'}>{item}</Text>
                    <SvgXml xml={close} width={24} fill={GRAY3} />
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: LINE,
    borderBottomWidth: 1,
  },
  searchResult: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  noSearchKeyword: {
    alignSelf: 'center',
    marginTop: 134,
    backgroundColor: WHITE,
  },
});

export default SearchScreen;
