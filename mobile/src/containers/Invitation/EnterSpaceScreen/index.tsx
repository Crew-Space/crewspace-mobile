import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';

import { arrowLeft } from 'assets/svg/icons';
import { BLACK, GRAY4, WHITE } from 'theme/Colors';
import { RootRouterParams } from 'types/Route';
import { ReqSpaceEnter } from 'types/Request';
import { useEnterSpaceMutation, useGetRegisterInfoQuery } from 'store/services/space';

import Text from 'components/Text';
import SvgIcon from 'components/SvgIcon';
import { Button } from 'components/Button';
import CrewOnError from 'components/CrewOnError';
import Step1 from './Step1';
import Step2 from './Step2';
import { setNewSpace } from 'store/slices/space';

type StepType = 1 | 2;

type StepsType = {
  [key in StepType]: {
    descInfo: string;
    onPress: () => void;
  };
};

const initialUserInput: ReqSpaceEnter = {
  name: '',
  description: '',
  birthdate: '',
  email: '',
  contact: '',
  sns: '',
  etc: '',
  memberCategoryId: 0,
};

const EnterSpaceScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootRouterParams>();
  const [stepLevel, setStepLevel] = useState<StepType>(1);
  const [userInput, setUserInput] = useState<ReqSpaceEnter>(initialUserInput);

  const { data: spaceInfo, isError: isGetRegisterInfoError } = useGetRegisterInfoQuery();
  const [enterSpace, { data: userInfo, isError, isSuccess }] = useEnterSpaceMutation();

  const steps: StepsType = {
    1: {
      descInfo: '회원분류를\n선택해 주세요👥',
      onPress: () => setStepLevel(2),
    },
    2: {
      descInfo: '추가 프로필을\n입력해 주세요✏️',
      onPress: () => enterSpace(userInput),
    },
  };

  useEffect(() => {
    if (isError) {
      Alert.alert('요청 실패', '동아리 스페이스에 입장하는데 실패했어요');
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && userInfo) {
      dispatch(setNewSpace(undefined));
      navigation.replace('Invitation', {
        screen: 'Welcome',
        params: {
          screenType: 'beMember',
          profile: {
            name: userInfo.name,
            image: userInfo.profileImage,
            description: userInfo.categoryName,
          },
        },
      });
    }
  }, [isSuccess, userInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: 40, paddingBottom: 20 }}>
        <Text fontType={'BOLD_20'} style={{ textAlign: 'center' }}>
          {steps[stepLevel].descInfo}
        </Text>
      </View>
      {spaceInfo && (
        <KeyboardAwareScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingBottom: 30 }}>
          {stepLevel === 1 ? (
            <Step1
              memberCategories={spaceInfo.memberCategories}
              setUserInfo={setUserInput}
              userInfo={userInput}
            />
          ) : (
            <Step2 {...spaceInfo} setUserInfo={setUserInput} userInfo={userInput} />
          )}
        </KeyboardAwareScrollView>
      )}
      <View style={styles.butttonView}>
        {stepLevel === 2 && (
          <>
            <Button onPress={() => setStepLevel(1)} style={{ width: 90, backgroundColor: BLACK }}>
              <SvgIcon xml={arrowLeft} fill={WHITE} width={24} disabled />
            </Button>
            <View style={{ width: 10 }} />
          </>
        )}
        <Button
          onPress={steps[stepLevel].onPress}
          style={{ flex: 1 }}
          disabled={
            (stepLevel === 1 &&
              (!userInput.name || !userInput.description || !userInput.memberCategoryId)) ||
            (spaceInfo &&
              stepLevel === 2 &&
              ((spaceInfo.hasEmail && !userInput.email) ||
                (spaceInfo.hasSns && !userInput.sns) ||
                (spaceInfo.hasContact && !userInput.contact) ||
                (spaceInfo.hasEtc && !userInput.etc) ||
                (spaceInfo.hasBirthdate && !userInput.birthdate)))
          }>
          {stepLevel === 1 ? '다음' : '완료'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    paddingHorizontal: 20,
  },
  circle: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GRAY4,
    borderRadius: 100,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  butttonView: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 30,
  },
});

export default EnterSpaceScreen;
