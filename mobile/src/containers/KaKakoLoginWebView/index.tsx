import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

import { ASYNC_STORAGE_KEY } from 'constant/AsyncStorage';
import { setToken } from 'store/slices/auth';
import { RootRouterParams } from 'types/Route';

const KaKakoLoginWebView = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootRouterParams>();
  const [accessToken, setAccessToken] = useState('');
  const runFirst =
    'window.ReactNativeWebView.postMessage(JSON.parse(window.document.querySelector("body>pre").innerText).token.accessToken);';

  const setUserAuth = async () => {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY.ACCESS_TOKEN, accessToken);
    dispatch(setToken({ token: accessToken }));
  };

  const onMessage = (event: WebViewMessageEvent) => {
    const token = event.nativeEvent.data;
    setAccessToken(token);
    navigation.goBack();
  };

  useEffect(() => {
    setUserAuth();
  }, [accessToken]);

  return (
    <WebView
      source={{ uri: 'https://crew-auth.o-r.kr/oauth2/authorization/kakao' }}
      onMessage={onMessage}
      injectedJavaScript={runFirst}
    />
  );
};

export default KaKakoLoginWebView;
