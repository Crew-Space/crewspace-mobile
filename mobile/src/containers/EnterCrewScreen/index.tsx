import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BLACK, GRAY4, WHITE } from 'theme/Colors';
import { MemberProfile } from 'types';
import Text from 'components/Text';
import SvgIcon from 'components/SvgIcon';
import { arrowLeft } from 'assets/svg/icons';
import Button from 'components/Button';
import { useNavigation } from '@react-navigation/core';
import { RootRouterParams } from 'types/Route';
import { welcomeParams } from 'constant/welcome';
import CustomEvent from 'constant/customEvent';
import Step1 from './Step1';
import Step2 from './Step2';

type StepType = 1 | 2;

type StepsType = {
  [key in StepType]: {
    descInfo: string;
    onPress: () => void;
  };
};

const EnterCrewScreen = () => {
  const navigation = useNavigation<RootRouterParams>();
  const [stepLevel, setStepLevel] = useState<StepType>(1);
  const [userInfo, setUserInfo] = useState<MemberProfile>({} as MemberProfile);

  //api ~/v1/space/register-info
  const data = {
    succcess: true,
    msg: '동아리 회원 가입 정보를 로드했습니다.',
    timestamp: '2021-11-25T06:51:19.145932',
    data: {
      hasBirthdate: true,
      hasEmail: true,
      hasContact: true,
      hasSns: true,
      hasEtc: true,
      memberCategories: [
        {
          categoryId: 6,
          categoryName: '운영진',
        },
        {
          categoryId: 7,
          categoryName: '개발팀',
        },
      ],
    },
  };

  const steps: StepsType = {
    1: {
      descInfo: '회원분류를\n선택해 주세요👥',
      onPress: () => setStepLevel(2),
    },
    2: {
      descInfo: '추가 프로필을\n입력해 주세요✏️',
      onPress: () => {
        //api ~/v1/space/enter
        const data = {
          succcess: true,
          msg: '동아리 가입을 성공했습니다.',
          timestamp: '2021-11-21T18:14:57.105583',
          data: {
            profileImage:
              'https://blog.kakaocdn.net/dn/IKDPO/btqU3oZ8nv9/3nkhB9jPjfUEwCMI6ywIk1/img.jpg',
            name: '오야옹',
            categoryName: '운영팀',
          },
        };

        navigation.replace('Invitation', {
          screen: 'Welcome',
          params: {
            data: {
              ...welcomeParams.beMember,
              profile: {
                name: data.data.name,
                imageUrl: data.data.profileImage,
                description: data.data.categoryName,
              },
            },
          },
        });
      },
    },
  };

  useEffect(() => {
    DeviceEventEmitter.addListener(CustomEvent.welcomeMainButton.name, () =>
      navigation.replace('Main'),
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: 40, paddingBottom: 20 }}>
        <Text fontType={'BOLD_20'} style={{ textAlign: 'center' }}>
          {steps[stepLevel].descInfo}
        </Text>
      </View>
      <KeyboardAwareScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ paddingBottom: 30 }}>
        {stepLevel === 1 ? (
          <Step1
            memberCategories={data.data.memberCategories}
            setUserInfo={setUserInfo}
            userInfo={userInfo}
          />
        ) : (
          <Step2 {...data.data} setUserInfo={setUserInfo} userInfo={userInfo} />
        )}
      </KeyboardAwareScrollView>
      <View style={styles.butttonView}>
        {stepLevel === 2 && (
          <>
            <Button onPress={() => setStepLevel(1)} style={{ width: 90, backgroundColor: BLACK }}>
              <SvgIcon xml={arrowLeft} fill={WHITE} width={24} disabled />
            </Button>
            <View style={{ width: 10 }} />
          </>
        )}
        <Button onPress={steps[stepLevel].onPress} style={{ flex: 1 }}>
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

export default EnterCrewScreen;
