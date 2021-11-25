import React from 'react';

import LineTextInput from 'components/LineTextInput';
import { ReqSpaceEnter } from 'types/Request';
import { StyleSheet, View } from 'react-native';

interface Props {
  hasEmail: boolean;
  hasSns: boolean;
  hasBirthdate: boolean;
  hasContact: boolean;
  hasEtc: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<ReqSpaceEnter>>;
  userInfo: ReqSpaceEnter;
}

const Step2 = ({
  hasBirthdate,
  hasEmail,
  hasContact,
  hasSns,
  hasEtc,
  userInfo,
  setUserInfo,
}: Props) => {
  const onChangeText = (text: string, name: string) => {
    setUserInfo({
      ...userInfo,
      [name]: text,
    });
  };
  return (
    <>
      {hasEmail && (
        <View style={styles.paddingWidth}>
          <LineTextInput
            placeholder={'이메일 주소 입력'}
            title={'email'}
            name={'email'}
            onChangeText={onChangeText}
          />
        </View>
      )}
      {hasSns && (
        <View style={styles.paddingWidth}>
          <LineTextInput
            placeholder={'SNS 아이디 입력'}
            title={'sns'}
            name={'sns'}
            onChangeText={onChangeText}
          />
        </View>
      )}
      {hasBirthdate && (
        <View style={styles.paddingWidth}>
          <LineTextInput title={'birthday'} name={'birthday'} onChangeText={onChangeText} />
        </View>
      )}
      {hasContact && (
        <View style={styles.paddingWidth}>
          <LineTextInput
            placeholder={'핸드폰 번호 입력'}
            title={'contact'}
            name={'contact'}
            onChangeText={onChangeText}
          />
        </View>
      )}
      {hasEtc && (
        <View style={styles.paddingWidth}>
          <LineTextInput
            placeholder={'기타 입력'}
            title={'etc'}
            name={'etc'}
            onChangeText={onChangeText}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  paddingWidth: {
    paddingTop: 40,
    width: '100%',
  },
});

export default Step2;
