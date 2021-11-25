import { DEV_BASE_URL, PROD_BASE_URL, KAKAO_AUTH_REST_API_ID, DUMMY_TOKEN } from '@env';

const ENV = {
  apiUrl: `${__DEV__ ? DEV_BASE_URL : PROD_BASE_URL}/v1`,
  authUrl: `${__DEV__ ? DEV_BASE_URL : PROD_BASE_URL}/auth`,
  kakaoClientId: KAKAO_AUTH_REST_API_ID,
  token: DUMMY_TOKEN,
};

export default ENV;
