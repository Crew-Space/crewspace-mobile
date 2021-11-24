import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { MemberProfileDetailsScreenPropsType } from 'types/Route';
import { MemberProfile } from 'types';
import { WHITE } from 'theme/Colors';
import ProfileImage from 'components/ProfileImage';
import TextInput from 'components/TextInput';
import ProfileDetails from './ProfileDetails';

const MemberProfileDetailsScreen = () => {
  const { params } = useRoute<MemberProfileDetailsScreenPropsType>();
  const data: MemberProfile = {
    name: '김수한',
    profileImage: 'https://blog.kakaocdn.net/dn/IKDPO/btqU3oZ8nv9/3nkhB9jPjfUEwCMI6ywIk1/img.jpg',
    memberCategory: '디자인팀',
    description: '안녕하세요, 함께 좋은 경험 쌓고 싶어요. 잘 부탁드려요!😇',
    birthday: '1999.08.31',
    email: 'jini_0831@naver.com',
    contact: '',
    sns: 'df234fdsf',
    etc: '',
  };

  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.outer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ProfileImage uri={data.profileImage} style={{ marginBottom: 18 }} />
          <TextInput fontType={'BOLD_18'} style={{ marginBottom: 20 }}>
            {data.name}
          </TextInput>
          <KeyboardAwareScrollView style={{ width: '100%' }}>
            <ProfileDetails data={data} />
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: WHITE },
  container: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 40,
  },
});

export default MemberProfileDetailsScreen;
