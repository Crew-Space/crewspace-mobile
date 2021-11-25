import { DEV_BASE_URL, PROD_BASE_URL, KAKAO_AUTH_REST_API_ID, DUMMY_TOKEN } from '@env';

const ENV = {
  apiUrl: __DEV__ ? DEV_BASE_URL : PROD_BASE_URL,
  kakaoClientId: KAKAO_AUTH_REST_API_ID,
  redirectUrl: `${__DEV__ ? DEV_BASE_URL : PROD_BASE_URL}/auth`,
  token: DUMMY_TOKEN,
};

export default ENV;
