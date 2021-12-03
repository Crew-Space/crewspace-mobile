import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { MemberProfileDetailsScreenPropsType } from 'types/Route';
import { WHITE } from 'theme/Colors';
import ProfileImage from 'components/ProfileImage';
import TextInput from 'components/TextInput';
import ProfileDetails from './ProfileDetails';
import { useGetMemberQuery, useUpdateMyProfileMutation } from 'store/services/member';
import { Button } from 'components/Button';
import { ReqUpdateMyProfile } from 'types/Request';
import CrewOnError from 'components/CrewOnError';

const initialUserInput: ReqUpdateMyProfile = {
  name: '',
  description: '',
  birthdate: '',
  email: '',
  contact: '',
  sns: '',
  etc: '',
  memberCategoryId: 0,
};

const MemberProfileDetailsScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<MemberProfileDetailsScreenPropsType>();
  const { data, isLoading, isFetching, isSuccess, isError } = useGetMemberQuery(params.memberId);
  const [updateProfile] = useUpdateMyProfileMutation();
  const [myProfile, setMyProfile] = useState<ReqUpdateMyProfile>(initialUserInput);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!isLoading && !isFetching && isSuccess && data) {
      setMyProfile({
        ...data,
        profileImage: undefined,
      });
    }
  }, [isLoading, isFetching, isSuccess]);

  const onChangeText = (text: string, name: string) => {
    setDisabled(false);
    setMyProfile({
      ...myProfile,
      [name]: text,
    });
  };

  if (isLoading) return <></>;
  if (isError || !data) return <CrewOnError />;

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
            onChangeText={onChangeText}
          />
          <KeyboardAwareScrollView style={{ width: '100%' }}>
            <ProfileDetails
              data={data}
              isMe={!!params.isMe}
              setMyProfile={setMyProfile}
              myProfile={myProfile}
              onChangeText={onChangeText}
            />
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
      {params.isMe && (
        <View style={styles.buttonContainer}>
          <Button
            disabled={disabled}
            onPress={() => {
              updateProfile(myProfile);
              navigation.goBack();
            }}>
            저장
          </Button>
        </View>
      )}
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
  buttonContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: WHITE,
  },
});

export default MemberProfileDetailsScreen;
