import React, { useEffect, useState } from 'react';

import { ScrollView } from 'react-native-gesture-handler';
import InfoBox from 'components/InfoBox';
import { CategoryEditList } from 'components/List';
import { CategoryType } from 'types';
import { ReqMakeSpace } from 'types/Request';

interface Props {
  setSpaceInput: React.Dispatch<React.SetStateAction<ReqMakeSpace>>;
  spaceInput: ReqMakeSpace;
}

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

const Step2 = ({ setSpaceInput, spaceInput }: Props) => {
  const [membercategories, setMemberCategories] = useState(initialCategories);

  useEffect(() => {
    setSpaceInput({
      ...spaceInput,
      memberCategory: membercategories.map((category) => category.name).slice(1),
    });
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
