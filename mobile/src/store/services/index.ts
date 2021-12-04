import { RootState } from 'store';

export const SPACE_INITAL_ID = -1;

export const header = (headers: Headers, { getState }: { getState: () => unknown }) => {
  const token = (getState() as RootState).auth.token;
  const spaceId = (getState() as RootState).space.current.spaceId;
  const newSpace = (getState() as RootState).space.newSpace;

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (newSpace) {
    headers.set('Space-Id', `${newSpace.spaceId}`);
  } else if (spaceId !== SPACE_INITAL_ID) {
    headers.set('Space-Id', `${spaceId}`);
  }

  return headers;
};
