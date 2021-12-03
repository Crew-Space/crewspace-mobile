import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import confetti from 'assets/svg/confetti';
import { BaseProfile } from 'types';
import { RootRouterParams } from 'types/Route';
import Text from 'components/Text';
import { Button, LinkButton } from 'components/Button';
import ProfileImage from 'components/ProfileImage';
import InvitationCode from './InvitationCode';
import { styles } from './styles';

const WelcomeToMakeSpace = ({
  profile,
  spaceCode,
}: {
  profile: BaseProfile;
  spaceCode?: string;
}) => {
  const navigation = useNavigation<RootRouterParams>();
  const { name, image, description } = profile;

  return (
    <>
      <SafeAreaView style={styles(false).container}>
        <View style={styles(false).flexCenter}>
          <Text fontType={'BOLD_20'} style={styles(false).title}>
            해커리어{'\n'}스페이스를 만들었어요🎉
          </Text>
          <SvgXml style={styles(false).confetti} xml={confetti} />
          <>
            <ProfileImage uri={image} />
            <Text fontType={'BOLD_18'} style={styles(false).name}>
              {name}
            </Text>
            <View style={{ paddingHorizontal: 20 }}>
              <Text paragraph fontType={'REGULAR_14'} style={styles(false).description}>
                {description}
              </Text>
            </View>
          </>
        </View>
        <View style={styles(false).bottomView}>
          {spaceCode && <InvitationCode code={spaceCode} />}
          <Button>초대코드 복사하기</Button>
          <LinkButton style={{ marginTop: 30 }} onPress={() => navigation.navigate('Main')}>
            동아리 스페이스로 이동하기
          </LinkButton>
        </View>
      </SafeAreaView>
    </>
  );
};

export default WelcomeToMakeSpace;
