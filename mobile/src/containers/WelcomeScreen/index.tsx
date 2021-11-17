import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/core';

import { BLACK, GRAY1, WHITE } from 'theme/Colors';
import Text from 'components/Text';
import Button from 'components/Button';
import { WelcomScreenProps } from 'types/Route';
import LinkButton from 'components/LinkButton';
import { SvgXml } from 'react-native-svg';
import confetti from 'assets/svg/confetti';
import ProfileImage from 'components/ProfileImage';
import InvitationCode from './InvitationCode';

const WelcomeScreen = () => {
  const { params } = useRoute<WelcomScreenProps>();
  const { data, darkTheme } = params;

  return (
    <>
      <SafeAreaView style={styles(darkTheme).container}>
        <View style={styles(darkTheme).flexCenter}>
          {data.title && (
            <Text fontType={'BOLD_20'} style={styles(darkTheme).title}>
              {data.title}
            </Text>
          )}
          <SvgXml style={styles(darkTheme).confetti} xml={confetti} />
          <ProfileImage uri={data.profile.imageUrl} />
          <Text fontType={'BOLD_18'} style={styles(darkTheme).name}>
            {data.profile.name}
          </Text>
          <Text paragraph fontType={'REGULAR_14'} style={styles(darkTheme).description}>
            {data.profile.description}
          </Text>
        </View>
        <View style={styles(darkTheme).bottomView}>
          {data.spaceInvitationCode && <InvitationCode code={data.spaceInvitationCode} />}
          <Button>{data.mainButtonName}</Button>
          <LinkButton style={{ marginTop: 30 }}>{data.linkButtonName}</LinkButton>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = (darkTheme = false) =>
  StyleSheet.create({
    flexCenter: { display: 'flex', alignItems: 'center' },
    container: {
      display: 'flex',
      flex: 1,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: darkTheme ? BLACK : WHITE,
    },
    title: { textAlign: 'center', marginTop: 36, color: darkTheme ? WHITE : BLACK },
    name: {
      textAlign: 'center',
      marginTop: 18,
      marginBottom: 20,
      color: darkTheme ? WHITE : BLACK,
    },
    confetti: { position: 'relative', left: -12, top: 40 },
    description: {
      textAlign: 'center',
      color: GRAY1,
    },
    bottomView: { width: '100%', alignItems: 'center', marginBottom: 30 },
  });

export default WelcomeScreen;