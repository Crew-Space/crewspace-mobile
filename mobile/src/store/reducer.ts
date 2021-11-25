import { combineReducers } from 'redux';

import user from 'store/slices/user';
import auth from 'store/slices/auth';

const reducer = combineReducers({
  user,
  auth,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
