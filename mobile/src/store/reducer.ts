import { combineReducers } from 'redux';

import user from 'store/slices/user';
import auth from 'store/slices/auth';
import { spaceApi } from './services/space';

const reducer = combineReducers({
  user,
  auth,
  [spaceApi.reducerPath]: spaceApi.reducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
