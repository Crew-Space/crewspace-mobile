import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

import { BLACK } from 'theme/Colors';
import Text from 'components/Text';
import { RootRouterParams } from 'types/Route';
import { ASYNC_STORAGE_KEY } from 'constant/AsyncStorage';
import { setToken } from 'store/slices/auth';
import useSetCurrentSpace from 'hooks/useSetCurrentSpace';

const AuthScreen = () => {
  const navigation = useNavigation<RootRouterParams>();
  const dispatch = useDispatch();
  const { isSuccess, errorCode, trigger, currentSpace } = useSetCurrentSpace();

  const setUser = async () => {
    const accessToken = await AsyncStorage.getItem(ASYNC_STORAGE_KEY.ACCESS_TOKEN);
    if (accessToken) {
      dispatch(setToken(accessToken));
      trigger();
    } else {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    switch (errorCode) {
      case 1:
        navigation.navigate('Login');
        break;
      case 2:
        navigation.navigate('Invitation');
        break;
    }
    SplashScreen.hide();
  }, [errorCode]);

  useEffect(() => {
    if (isSuccess && currentSpace) {
      navigation.navigate('Main');
      SplashScreen.hide();
    }
  }, [isSuccess, currentSpace]);

  useEffect(() => {
    setUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: BLACK,
  },
});

export default AuthScreen;
