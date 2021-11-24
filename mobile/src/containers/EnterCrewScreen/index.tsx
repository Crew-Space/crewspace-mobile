import React, { useState } from 'react';
import { DeviceEventEmitter, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BLACK, GRAY1, GRAY2, GRAY3, GRAY4, WHITE } from 'theme/Colors';
import Text from 'components/Text';
import SvgIcon from 'components/SvgIcon';
import { arrowLeft, image } from 'assets/svg/icons';
import LineTextInput from 'components/LineTextInput';
import { ScrollView } from 'react-native-gesture-handler';
import Button from 'components/Button';
import { useNavigation } from '@react-navigation/core';
import { RootRouterParams } from 'types/Route';
import { welcomeParams } from 'constant/welcome';
import CustomEvent from 'constant/customEvent';

const mock = [
  { id: 1, name: '운영진' },
  { id: 3, name: '기획팀' },
  { id: 2, name: '디자인팀' },
  { id: 4, name: '마케팅팀' },
  { id: 5, name: '개발팀' },
  // { id: 5, name: '개발팀' },
  // { id: 6, name: '개발팀' },
  // { id: 7, name: '개발팀' },
];

type StepType = 1 | 2;

const Step1 = () => (
  <>
    <View style={{ paddingTop: 20, alignItems: 'center' }}>
      <View style={styles.circle}>
        <SvgIcon xml={image} fill={GRAY3} width={24} />
      </View>
    </View>
    <View style={{ paddingTop: 40, width: '100%' }}>
      <LineTextInput
        fontType={'BOLD_18'}
        placeholder={'이름'}
        limit={20}
        style={{ textAlign: 'center' }}
      />
    </View>
    <View style={{ paddingTop: 40, width: '100%' }}>
      <LineTextInput multiline placeholder={'소개를 입력해주세요'} limit={100} title={'소개'} />
    </View>
    <View style={{ paddingTop: 40, width: '100%' }}>
      <Text fontType={'REGULAR_12'} color={GRAY2}>
        회원분류
      </Text>
      <View style={styles.categoryList}>
        {mock.map((category) => (
          <View
            key={category.id}
            style={{
              alignSelf: 'center',
              paddingVertical: 12,
              paddingHorizontal: 18,
              borderRadius: 8,
              borderColor: GRAY3,
              borderWidth: 1,
              marginRight: 10,
              marginBottom: 10,
            }}>
            <Text fontType={'REGULAR_14'} color={GRAY1}>
              {category.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  </>
);

const Step2 = () => (
  <View>
    <View style={{ paddingTop: 40 }}>
      <LineTextInput placeholder={'소개를 입력해주세요'} limit={100} title={'소개'} />
    </View>
    <View style={{ paddingTop: 40 }}>
      <LineTextInput placeholder={'소개를 입력해주세요'} limit={100} title={'소개'} />
    </View>
    <View style={{ paddingTop: 40 }}>
      <LineTextInput placeholder={'소개를 입력해주세요'} limit={100} title={'소개'} />
    </View>
  </View>
);

type StepsType = {
  [key in StepType]: {
    descInfo: string;
    onPress: () => void;
  };
};

const EnterCrewScreen = () => {
  const navigation = useNavigation<RootRouterParams>();
  const [stepLevel, setStepLevel] = useState<StepType>(1);

  const steps: StepsType = {
    1: {
      descInfo: '회원분류를\n선택해 주세요👥',
      onPress: () => setStepLevel(2),
    },
    2: {
      descInfo: '추가 프로필을\n입력해 주세요✏️',
      onPress: () =>
        navigation.replace('Invitation', {
          screen: 'Welcome',
          params: {
            data: {
              ...welcomeParams.beMember,
              profile: {
                name: '김수한',
                imageUrl:
                  'https://blog.kakaocdn.net/dn/IKDPO/btqU3oZ8nv9/3nkhB9jPjfUEwCMI6ywIk1/img.jpg',
                description: '디자인팀',
              },
            },
          },
        }),
    },
  };

  DeviceEventEmitter.addListener(CustomEvent.welcomeMainButton.name, () =>
    navigation.replace('Main'),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: 40, paddingBottom: 20 }}>
        <Text fontType={'BOLD_20'} style={{ textAlign: 'center' }}>
          {steps[stepLevel].descInfo}
        </Text>
      </View>
      <ScrollView style={{ width: '100%' }}>{stepLevel === 1 ? <Step1 /> : <Step2 />}</ScrollView>
      <View style={styles.butttonView}>
        {stepLevel === 2 && (
          <>
            <Button
              onPress={steps[stepLevel].onPress}
              style={{ width: 90, backgroundColor: BLACK }}>
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
