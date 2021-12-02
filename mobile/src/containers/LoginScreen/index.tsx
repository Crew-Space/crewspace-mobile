import React, { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';

import { logo } from 'assets/svg';
import kakaoLogin from 'assets/svg/kakaoLogin';
import { BLACK, GRAY2, WHITE } from 'theme/Colors';
import Text from 'components/Text';
import { RootRouterParams } from 'types/Route';
import { crewOnEarth } from 'assets/svg/spacers';
import useSetCurrentSpace from 'hooks/useSetCurrentSpace';

const LoginScreen = () => {
  const navigation = useNavigation<RootRouterParams>();
  const token = useSelector((state) => state.auth.token);
  const { isSuccess, errorCode, trigger, currentSpace } = useSetCurrentSpace();

  const onPress = async () => {
    navigation.navigate('KaKaoLogin');
  };

  useEffect(() => {
    console.log('LoginScreen', errorCode);
    switch (errorCode) {
      case 1:
        // 뭔가 다른 에러 처리
        Alert.alert(
          'Alert Title',
          'My Alert Msg',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
        break;
      case 2:
        navigation.navigate('Invitation');
        break;
    }
  }, [errorCode]);

  useEffect(() => {
    if (isSuccess && currentSpace) {
      navigation.navigate('Main');
    }
  }, [isSuccess, currentSpace]);

  useEffect(() => {
    if (token) {
      console.log('loginScreen', token);
      trigger();
    }
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text fontType={'REGULAR_16'} style={styles.subTitle}>
          우리 동아리만의{'\n'}모바일 공간
        </Text>
        <SvgXml xml={logo} fill={BLACK} />
      </View>
      <View style={styles.crewSvg}>
        <SvgXml xml={crewOnEarth} />
      </View>
      <View>
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
    backgroundColor: WHITE,
    padding: 32,
  },
  subTitle: { color: BLACK, lineHeight: 30, marginBottom: 14 },
  crewSvg: { alignItems: 'center', justifyContent: 'center' },
  policyText: { color: GRAY2, textAlign: 'center', marginTop: 20 },
});

export default LoginScreen;
