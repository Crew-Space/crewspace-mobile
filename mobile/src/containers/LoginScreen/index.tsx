import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';

import { logo } from 'assets/svg';
import kakaoLogin from 'assets/svg/kakaoLogin';
import { BLACK, GRAY2, WHITE } from 'theme/Colors';
import Text from 'components/Text';
import { RootRouterParams } from 'types/Route';

const LoginScreen = () => {
  const navigation = useNavigation<RootRouterParams>();

  const onPress = useCallback(() => {
    const spaceList = [];
    navigation.replace(spaceList.length ? 'Main' : 'Invitation');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: '15%' }}>
        <Text fontType={'REGULAR_16'} style={styles.subTitle}>
          우리 동아리만의{'\n'}모바일 공간
        </Text>
        <SvgXml xml={logo} />
      </View>
      <View style={{ marginBottom: '12%' }}>
        <SvgXml xml={kakaoLogin} onPress={onPress} />
        <Text paragraph fontType={'REGULAR_14'} style={styles.policyText}>
          계정 생성 시 크루 스페이스의{'\n'}
          개인정보 수집 방침 및 이용약관에 동의하게 됩니다.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: BLACK,
    padding: 32,
  },
  subTitle: { color: WHITE, lineHeight: 30, marginBottom: 14 },
  policyText: { color: GRAY2, textAlign: 'center', marginTop: 20 },
});

export default LoginScreen;
