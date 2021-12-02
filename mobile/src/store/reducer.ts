import { combineReducers } from 'redux';

import space from 'store/slices/space';
import auth from 'store/slices/auth';
import screen from 'store/slices/screen';
import posts from './slices/posts';
import newPost from './slices/newPost';
import sideMenu from './slices/sideMenu';
import { spaceApi } from './services/space';
import { postApi } from './services/post';
import { memberApi } from './services/member';

const reducer = combineReducers({
  space,
  auth,
  screen,
  posts,
  newPost,
  sideMenu,
  [spaceApi.reducerPath]: spaceApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [memberApi.reducerPath]: memberApi.reducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
