import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommunityPostPreview, NoticePostPreview } from 'types/Response';

const initialState: {
  homeNoticePosts: NoticePostPreview[];
  noticePosts: NoticePostPreview[];
  communityPosts: CommunityPostPreview[];
} = {
  homeNoticePosts: [],
  noticePosts: [],
  communityPosts: [],
};

export const posts = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setPostSave: (state, action: PayloadAction<number>) => ({
      homeNoticePosts: [
        ...state.homeNoticePosts.map((post) =>
          post.postId === action.payload ? { ...post, isSaved: true } : post,
        ),
      ],
      noticePosts: [
        ...state.noticePosts.map((post) =>
          post.postId === action.payload ? { ...post, isSaved: true } : post,
        ),
      ],
      communityPosts: [
        ...state.communityPosts.map((post) =>
          post.postId === action.payload ? { ...post, isSaved: true } : post,
        ),
      ],
    }),
    setPostUnsave: (state, action: PayloadAction<number>) => ({
      homeNoticePosts: [
        ...state.homeNoticePosts.map((post) =>
          post.postId === action.payload ? { ...post, isSaved: false } : post,
        ),
      ],
      noticePosts: [
        ...state.noticePosts.map((post) =>
          post.postId === action.payload ? { ...post, isSaved: false } : post,
        ),
      ],
      communityPosts: [
        ...state.communityPosts.map((post) =>
          post.postId === action.payload ? { ...post, isSaved: false } : post,
        ),
      ],
    }),

    setPostRead: (state, action: PayloadAction<number>) => ({
      ...state,
      homeNoticePosts: [
        ...state.homeNoticePosts.map((post) =>
          post.postId === action.payload ? { ...post, isRead: true } : post,
        ),
      ],
    }),

    setHomeNoticePosts: (state, action: PayloadAction<NoticePostPreview[]>) => ({
      ...state,
      homeNoticePosts: [...state.homeNoticePosts, ...action.payload],
    }),
    setNoticePosts: (state, action: PayloadAction<NoticePostPreview[]>) => ({
      ...state,
      noticePosts: [...state.noticePosts, ...action.payload],
    }),
    setCommunityPosts: (state, action: PayloadAction<CommunityPostPreview[]>) => ({
      ...state,
      communityPosts: [...state.communityPosts, ...action.payload],
    }),
    resetHomeNoticePosts: (state, _action: PayloadAction<void>) => ({
      ...state,
      homeNoticePosts: [],
    }),
    resetNoticePosts: (state, _action: PayloadAction<void>) => ({
      ...state,
      noticePosts: [],
    }),
    resetCommunityPosts: (state, _action: PayloadAction<void>) => ({
      ...state,
      communityPosts: [],
    }),
  },
});

export const {
  setPostSave,
  setPostUnsave,
  setPostRead,
  setHomeNoticePosts,
  setNoticePosts,
  setCommunityPosts,
  resetHomeNoticePosts,
  resetNoticePosts,
  resetCommunityPosts,
} = posts.actions;
export default posts.reducer;
