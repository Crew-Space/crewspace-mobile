import React, { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { logo } from 'assets/svg';
import kakaoLogin from 'assets/svg/kakaoLogin';
import { BLACK, GRAY2, WHITE } from 'theme/Colors';
import Text from 'components/Text';
import { RootRouterParams } from 'types/Route';
import useSetCurrentSpace from 'hooks/useSetCurrentSpace';
import { ASYNC_STORAGE_KEY } from 'constant/AsyncStorage';

const LoginScreen = () => {
  const navigation = useNavigation<RootRouterParams>();
  const token = useSelector((state) => state.auth.token);
  const { isSuccess, errorCode, trigger, currentSpace, unsubscribe } = useSetCurrentSpace();

  const onPress = async () => {
    navigation.navigate('KaKaoLogin');
  };

  useEffect(() => {
    switch (errorCode) {
      case 1:
        Alert.alert('문제가 발생하였습니다');
        break;
      case 2:
        navigation.navigate('Invitation');
        break;
    }
    unsubscribe();
  }, [errorCode]);

  useEffect(() => {
    if (isSuccess && currentSpace) {
      navigation.navigate('Main');
      unsubscribe();
    }
  }, [isSuccess, currentSpace]);

  useEffect(() => {
    if (token) {
      console.log('new AccessToken', token);
      (async function () {
        await AsyncStorage.setItem(ASYNC_STORAGE_KEY.ACCESS_TOKEN, token);
      })();
      trigger();
    }
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text fontType={'REGULAR_16'} style={styles.subTitle}>
          우리 동아리만의{'\n'}모바일 공간
        </Text>
        <SvgXml xml={logo} fill={WHITE} />
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
    backgroundColor: BLACK,
    padding: 32,
  },
  subTitle: { color: WHITE, lineHeight: 30, marginBottom: 14 },
  policyText: { color: GRAY2, textAlign: 'center', marginTop: 20 },
});

export default LoginScreen;
