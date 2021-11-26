import { combineReducers } from 'redux';

import space from 'store/slices/space';
import auth from 'store/slices/auth';
import { spaceApi } from './services/space';

const reducer = combineReducers({
  space,
  auth,
  [spaceApi.reducerPath]: spaceApi.reducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
