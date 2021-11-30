import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

import { logo } from 'assets/svg';
import kakaoLogin from 'assets/svg/kakaoLogin';
import { BLACK, GRAY2, WHITE } from 'theme/Colors';
import Text from 'components/Text';
import { RootRouterParams } from 'types/Route';
import { crewOnEarth } from 'assets/svg/spacers';
import ENV from 'environments';
import { ASYNC_STORAGE_KEY } from 'constant/AsyncStorage';
import { setToken } from 'store/slices/auth';
import { setSpace } from 'store/slices/space';
import { useGetMySpacesQuery } from 'store/services/space';

const LoginScreen = () => {
  const navigation = useNavigation<RootRouterParams>();
  const dispatch = useDispatch();
  const { data, isSuccess, isError, isLoading } = useGetMySpacesQuery();
  const token = useRef<string>();
  const [loginPage, setLoginPage] = useState(false);

  const setUser = async () => {
    const accessToken = (await AsyncStorage.getItem(ASYNC_STORAGE_KEY.ACCESS_TOKEN)) || null;
    if (!accessToken) {
      setLoginPage(true);
      return;
    }

    token.current = accessToken;
    dispatch(setToken({ token: accessToken }));
  };

  const setCurrentSpace = async () => {
    const id = await AsyncStorage.getItem(ASYNC_STORAGE_KEY.SPACE_ID);
    if (!id) {
      setLoginPage(true);
      return;
    }

    if (!data?.spaces.length) {
      await AsyncStorage.removeItem(ASYNC_STORAGE_KEY.SPACE_ID);
      navigation.replace('Invitation');
      return;
    }

    const currentSpace = data.spaces.find((space) => space.spaceId === +id);

    if (!currentSpace) {
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY.SPACE_ID, data.spaces[0].spaceId.toString());
      dispatch(setSpace(data.spaces[0]));
    } else {
      dispatch(setSpace(currentSpace));
    }
    navigation.replace('Main');
  };

  const onPress = async () => {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY.ACCESS_TOKEN, ENV.token);
    dispatch(setToken({ token: ENV.token }));

    navigation.replace('Invitation');
  };

  useEffect(() => {
    if (token.current === undefined) return;

    if (isSuccess && token.current) setCurrentSpace();
    else setLoginPage(true);
    SplashScreen.hide();
  }, [data, token.current, isSuccess]);

  useEffect(() => {
    if (isError) SplashScreen.hide();
  }, [isError]);

  useLayoutEffect(() => {
    setUser();
  }, []);

  if (isLoading) return <></>;
  if (!loginPage) return <View style={{ backgroundColor: WHITE }} />;

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
