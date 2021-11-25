import { combineReducers } from 'redux';

import user from 'store/slices/user';

const reducer = combineReducers({
  user,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
