import { combineReducers } from 'redux';

import space from 'store/slices/space';
import auth from 'store/slices/auth';
import { spaceApi } from './services/space';
import { postApi } from './services/post';

const reducer = combineReducers({
  space,
  auth,
  [spaceApi.reducerPath]: spaceApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
