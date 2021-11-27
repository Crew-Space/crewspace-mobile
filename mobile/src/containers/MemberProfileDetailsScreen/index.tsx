import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { MemberProfileDetailsScreenPropsType } from 'types/Route';
import { WHITE } from 'theme/Colors';
import ProfileImage from 'components/ProfileImage';
import TextInput from 'components/TextInput';
import ProfileDetails from './ProfileDetails';
import { useGetMemberQuery } from 'store/services/member';

const MemberProfileDetailsScreen = () => {
  const { params } = useRoute<MemberProfileDetailsScreenPropsType>();
  const { data } = useGetMemberQuery(params.memberId);

  if (!data) return <></>;

  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.outer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ProfileImage uri={data.profileImage} style={{ marginBottom: 18 }} />
          <TextInput
            fontType={'BOLD_18'}
            style={{ marginBottom: 20 }}
            name={'name'}
            defaultValue={data.name}
            editable={!!params.isMe}
          />
          <KeyboardAwareScrollView style={{ width: '100%' }}>
            <ProfileDetails data={data} isMe={!!params.isMe} />
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
