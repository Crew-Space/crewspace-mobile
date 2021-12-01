import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

import { BACKGROUND, WHITE } from 'theme/Colors';
import InfoBox from 'components/InfoBox';
import { CategoryType } from 'types';
import CategoryEditList from 'components/CategoryEditList';

const mock: { [key: string]: CategoryType[] } = {
  notice: [
    {
      id: 0,
      name: '일반 공지',
      isDeletable: false,
      isEditable: true,
    },
    {
      id: 1,
      name: '활동 공지',
      isDeletable: true,
      isEditable: true,
    },
  ],
  community: [
    {
      id: 2,
      name: '일반 글',
      isDeletable: false,
      isEditable: true,
    },
    {
      id: 3,
      name: '인사이트',
      isDeletable: true,
      isEditable: true,
    },
    {
      id: 4,
      name: '일상 공유',
      isDeletable: true,
      isEditable: true,
    },
  ],
};

const EditCategoryScreen = () => {
  const [noticeCategories, setNoticeCategories] = useState(mock.notice);
  const [communityCategories, setCommunityCategories] = useState(mock.community);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
      <ScrollView>
        <View style={{ padding: 20, backgroundColor: WHITE }}>
          <InfoBox boxType={'warning'} text={"'일반' 카테고리는 삭제가 불가능해요"} />
        </View>
        <CategoryEditList
          title={'공지'}
          data={noticeCategories}
          setCategories={setNoticeCategories}
          placeholder={'카테고리 이름'}
        />
        <CategoryEditList
          title={'커뮤니티'}
          data={communityCategories}
          setCategories={setCommunityCategories}
          placeholder={'카테고리 이름'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: BACKGROUND,
  },
});

export default EditCategoryScreen;
