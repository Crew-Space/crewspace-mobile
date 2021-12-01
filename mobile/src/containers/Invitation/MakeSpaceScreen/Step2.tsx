import React, { useEffect, useState } from 'react';

import { ScrollView } from 'react-native-gesture-handler';
import InfoBox from 'components/InfoBox';
import CategoryEditList from 'components/CategoryEditList';
import { CategoryType } from 'types';

const initialCategories: Omit<CategoryType, 'id'>[] = [
  {
    name: '운영진',
    isDeletable: false,
    isEditable: false,
  },
  {
    name: '일반 회원',
    isDeletable: false,
    isEditable: true,
  },
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

export default Step2;
