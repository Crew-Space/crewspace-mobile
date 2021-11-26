import ENV from 'environments';
import { RootState } from 'store';

export const SPACE_INITAL_ID = -1;

export const header = (headers: Headers, { getState }: { getState: () => unknown }) => {
  const token = ENV.token;
  const spaceId = (getState() as RootState).space.spaceId;

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (spaceId !== SPACE_INITAL_ID) {
    headers.set('Space-Id', `${spaceId}`);
  }

  return headers;
};
