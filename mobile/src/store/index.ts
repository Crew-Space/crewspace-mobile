import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import reducer from 'store/reducer';
import { spaceApi } from './services/space';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, spaceApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
