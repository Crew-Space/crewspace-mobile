import React from 'react';
import { Alert, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import confetti from 'assets/svg/confetti';
import { RootRouterParams } from 'types/Route';
import { BaseProfile } from 'types';
import Text from 'components/Text';
import { Button, LinkButton } from 'components/Button';
import ProfileImage from 'components/ProfileImage';
import { styles } from './styles';

const WelcomeToSpace = ({ profile }: { profile: BaseProfile }) => {
  const navigation = useNavigation<RootRouterParams>();
  const { name, image, description } = profile;

  const mySpaces = useSelector((state) => state.space.mySpaces);
  const current = useSelector((state) => state.space.current);

  return (
    <>
      <SafeAreaView style={styles(true).container}>
        <View style={[styles(true).flexCenter, { paddingTop: 100 }]}>
          <SvgXml style={styles(true).confetti} xml={confetti} />
          <ProfileImage uri={image} />
          <Text fontType={'BOLD_18'} style={styles(true).name}>
            {name}
          </Text>
          <View style={{ paddingHorizontal: 20 }}>
            <Text paragraph fontType={'REGULAR_14'} style={styles(true).description}>
              {description}
            </Text>
          </View>
        </View>
        <View style={styles(true).bottomView}>
          <Button
            onPress={() => {
              const isAlreadyEntered = mySpaces.find((space) => space.spaceId === current.spaceId);
              if (isAlreadyEntered) {
                Alert.alert('에러', '이미 가입된 스페이스입니다.');
              } else {
                navigation.navigate('Invitation', {
                  screen: 'EnterSpace',
                });
              }
            }}>
            동아리 스페이스 입장
          </Button>
          <LinkButton style={{ marginTop: 30 }} onPress={() => navigation.goBack()}>
            초대코드 다시 입력하기
          </LinkButton>
        </View>
      </SafeAreaView>
    </>
  );
};

export default WelcomeToSpace;
