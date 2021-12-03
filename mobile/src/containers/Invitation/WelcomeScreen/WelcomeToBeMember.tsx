import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { SvgXml } from 'react-native-svg';

import confetti from 'assets/svg/confetti';
import { RootRouterParams } from 'types/Route';
import Text from 'components/Text';
import { Button } from 'components/Button';
import ProfileImage from 'components/ProfileImage';
import { BaseProfile } from 'types';
import { styles } from './styles';

const WelcomeToBeMember = ({ profile }: { profile: BaseProfile }) => {
  const navigation = useNavigation<RootRouterParams>();
  const { name, image, description } = profile;

  return (
    <SafeAreaView style={styles(false).container}>
      <View style={styles(false).flexCenter}>
        <Text fontType={'BOLD_20'} style={styles(false).title}>
          축하해요🎉{'\n'}계정을 만들었어요
        </Text>
        <SvgXml style={styles(false).confetti} xml={confetti} />
        <ProfileImage uri={image} />
        <Text fontType={'BOLD_18'} style={styles(false).name}>
          {name}
        </Text>
        <View style={{ paddingHorizontal: 20 }}>
          <Text paragraph fontType={'REGULAR_14'} style={styles(false).description}>
            {description}
          </Text>
        </View>
      </View>
      <View style={styles(false).bottomView}>
        <Button onPress={() => navigation.navigate('Main')}>동아리 스페이스로 이동</Button>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeToBeMember;
