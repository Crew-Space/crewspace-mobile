import React, { useEffect, useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import InfoBox from 'components/InfoBox';
import { ReadonlyList } from 'components/List';
import { BACKGROUND, WHITE } from 'theme/Colors';
import CheckBoxList from 'components/CheckBoxList';
import { SPACE_MEMBER_INFO_OPTIONS_TEXT } from 'constant';
import { ReqMakeSpace } from 'types/Request';

interface Props {
  setSpaceInput: React.Dispatch<React.SetStateAction<ReqMakeSpace>>;
  spaceInput: ReqMakeSpace;
}

const Step3 = ({ setSpaceInput, spaceInput }: Props) => {
  const data = Object.values(SPACE_MEMBER_INFO_OPTIONS_TEXT);
  const [checkValue, onValueChange] = useState(
    Object.keys(SPACE_MEMBER_INFO_OPTIONS_TEXT).map((option) => ({ key: option, value: false })),
  );

  useEffect(() => {
    setSpaceInput({
      ...spaceInput,
      ...checkValue.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.key]: cur.value,
        };
      }, {}),
    });
  }, [checkValue]);

  return (
    <ScrollView style={styles.container}>
      <InfoBox
        boxType={'warning'}
        text={"'기본' 정보는 선택 해제가 불가능해요"}
        style={{ marginHorizontal: 20, marginVertical: 20 }}
      />
      <View style={styles.list}>
        <ReadonlyList title={'기본'} data={['이름', '소개', '회원분류']} />
        <View style={{ height: 8 }} />
        <CheckBoxList
          title={'추가 프로필'}
          data={data}
          onValueChange={onValueChange}
          value={checkValue}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
  },
  paddingWidth: {
    paddingTop: 40,
    width: '100%',
  },
  list: {
    backgroundColor: BACKGROUND,
  },
});

export default Step3;
