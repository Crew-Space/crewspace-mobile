import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import reducer from 'store/reducer';
import { postApi } from './services/post';
import { spaceApi } from './services/space';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, spaceApi.middleware, postApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
