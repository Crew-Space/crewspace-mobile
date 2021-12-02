import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';

import CustomEvent from 'constant/customEvent';
import { ReqMakeSpace } from 'types/Request';
import { RootRouterParams } from 'types/Route';
import { BLACK, GRAY4, WHITE } from 'theme/Colors';
import { arrowLeft } from 'assets/svg/icons';
import { useMakeSpaceMutation } from 'store/services/space';

import Text from 'components/Text';
import SvgIcon from 'components/SvgIcon';
import Button from 'components/Button';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

type StepType = 1 | 2 | 3;

type StepsType = {
  [key in StepType]: {
    descInfo: string;
    onPress: () => void;
  };
};

const initialUserInput: ReqMakeSpace = {
  name: '',
  description: '',
  memberCategory: [],
  hasBirthdate: false,
  hasEmail: false,
  hasContact: false,
  hasSns: false,
  hasEtc: false,
};

const MakeSpaceScreen = () => {
  const navigation = useNavigation<RootRouterParams>();
  const [stepLevel, setStepLevel] = useState<StepType>(1);
  const [spaceInput, setSpaceInput] = useState<ReqMakeSpace>(initialUserInput);

  const [makeSpace, { data, isError, isSuccess, isLoading }] = useMakeSpaceMutation();

  const steps: StepsType = {
    1: {
      descInfo: '만나서 반가워요 🙌 \n이름과 사진을 설정해 주세요',
      onPress: () => setStepLevel(2),
    },
    2: {
      descInfo: '동아리의 회원분류를\n설정해 주세요👥',
      onPress: () => setStepLevel(3),
    },
    3: {
      descInfo: '동아리 가입 시 필요한\n회원정보를 설정해 주세요✅',
      onPress: async () => {
        if (!spaceInput) return;
        makeSpace(spaceInput);
      },
    },
  };

  DeviceEventEmitter.addListener(CustomEvent.welcomeMainButton.name, () => {
    navigation.replace('Main');
  });

  useEffect(() => {
    if (isSuccess && !isLoading) {
    }
  }, [isSuccess, isLoading]);

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
          <Step1 setSpaceInput={setSpaceInput} spaceInput={spaceInput} />
        ) : stepLevel === 2 ? (
          <Step2 setSpaceInput={setSpaceInput} spaceInput={spaceInput} />
        ) : (
          <Step3 setSpaceInput={setSpaceInput} spaceInput={spaceInput} />
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
        <Button
          onPress={steps[stepLevel].onPress}
          style={{ flex: 1 }}
          disabled={stepLevel === 1 && (!spaceInput.name || !spaceInput.description)}>
          {stepLevel !== 3 ? '다음' : '완료'}
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
    paddingHorizontal: 20,
  },
});

export default MakeSpaceScreen;
