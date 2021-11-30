import React, { useEffect, useState } from 'react';

import LineTextInput from 'components/LineTextInput';
import { ReqSpaceEnter } from 'types/Request';
import { StyleSheet, View } from 'react-native';
import Text from 'components/Text';
import { ScrollView } from 'react-native-gesture-handler';
import SectionHeader from 'components/SectionHeader';
import { GRAY2, LINE, PRIMARY, WHITE } from 'theme/Colors';
import { member, plus, trash } from 'assets/svg/icons';
import SvgIcon from 'components/SvgIcon';
import TextInput from 'components/TextInput';
import TouchableText from 'components/TouchableText';
import InfoBox from 'components/InfoBox';
import CategoryEditList from 'components/CategoryEditList';
import { NewCategoryType } from 'types';

const initialCategories: NewCategoryType[] = [
  {
    name: '운영진',
    isDeletable: false,
    isEditable: false,
  },
  { name: '일반 회원', isDeletable: false, isEditable: true },
];

const Step2 = () => {
  const [membercategories, setMemberCategories] = useState(initialCategories);

  useEffect(() => {
    console.log(membercategories);
  }, [membercategories]);

  return (
    <>
      <ScrollView>
        <InfoBox
          boxType={'warning'}
          text={"'운영진' 회원 분류는 수정/삭제가 불가능해요"}
          style={{ marginHorizontal: 20, marginVertical: 20 }}
        />
        <CategoryEditList
          title={'회원 분류'}
          data={membercategories}
          setCategories={setMemberCategories}
          placeholder={'회원분류 이름'}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  paddingWidth: {
    paddingTop: 40,
    width: '100%',
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

export default Step2;
