import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

import { plus, trash } from 'assets/svg/icons';
import { BACKGROUND, GRAY2, LINE, WHITE } from 'theme/Colors';
import InfoBox from 'components/InfoBox';
import SectionHeader from 'components/SectionHeader';
import SvgIcon from 'components/SvgIcon';
import TextInput from 'components/TextInput';
import TouchableText from 'components/TouchableText';

const mock = {
  notice: [
    { text: '일반 공지', id: 0 },
    { text: '활동 공지', id: 1 },
  ],
  community: [
    { text: '일반 글', id: 2 },
    { text: '인사이트', id: 3 },
    { text: '일상 공유', id: 4 },
  ],
};

const ListItem = ({ key, name, onPress }) => (
  <View key={key} style={styles.item}>
    <TextInput defaultValue={name} />
    <SvgIcon xml={trash} fill={GRAY2} width={24} onPress={onPress} />
  </View>
);

const NewItem = ({ addMode, categoryList, setCategoryList, setAddMode }) => {
  const [inputText, setInputText] = useState<string>();

  return (
    <View style={styles.item}>
      <TextInput placeholder={'카테고리 이름'} onChangeText={setInputText} />
      <View style={{ flexDirection: 'row' }}>
        <TouchableText onPress={() => setAddMode('none')}>취소</TouchableText>
        <View style={{ width: 20 }} />
        <TouchableText
          onPress={() => {
            setCategoryList({
              ...categoryList,
              [addMode]: [...categoryList[addMode], { text: inputText, id: 100 }],
            });
            setAddMode('none');
          }}>
          추가
        </TouchableText>
      </View>
    </View>
  );
};

const EditCategory = () => {
  const [addMode, setAddMode] = useState<'none' | 'notice' | 'community'>('none');
  const [categoryList, setCategoryList] = useState<typeof mock>(mock);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
      <ScrollView>
        <View style={{ padding: 20, backgroundColor: WHITE }}>
          <InfoBox boxType={'warning'} text={"'일반' 카테고리는 삭제가 불가능해요"} />
        </View>
        <View style={{ marginBottom: 8 }}>
          <SectionHeader text={'공지'}>
            <SvgIcon xml={plus} fill={GRAY2} onPress={() => setAddMode('notice')} />
          </SectionHeader>
          {categoryList.notice.map((item, index) => (
            <ListItem
              key={index}
              name={item.text}
              onPress={() =>
                setCategoryList({
                  ...categoryList,
                  notice: categoryList.notice.filter((e) => e.id !== item.id),
                })
              }
            />
          ))}
          {addMode === 'notice' && (
            <NewItem
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              setAddMode={setAddMode}
              addMode={addMode}
            />
          )}
        </View>
        <View style={{ marginBottom: 8 }}>
          <SectionHeader text={'커뮤니티'}>
            <SvgIcon xml={plus} fill={GRAY2} onPress={() => setAddMode('community')} />
          </SectionHeader>
          {categoryList.community.map((item, index) => (
            <ListItem
              key={index}
              name={item.text}
              onPress={() =>
                setCategoryList({
                  ...categoryList,
                  community: categoryList.community.filter((e) => e.id !== item.id),
                })
              }
            />
          ))}
          {addMode === 'community' && (
            <NewItem
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              setAddMode={setAddMode}
              addMode={addMode}
            />
          )}
        </View>
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
});

export default EditCategory;
