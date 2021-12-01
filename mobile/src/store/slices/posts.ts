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
      homeNoticePosts: [...state.homeNoticePosts.filter((post) => post.postId !== action.payload)],
      noticePosts: [...state.noticePosts.filter((post) => post.postId !== action.payload)],
      communityPosts: [...state.communityPosts.filter((post) => post.postId !== action.payload)],
    }),

    setPostRead: (state, action: PayloadAction<number>) => ({
      ...state,
      homeNoticePosts: [
        ...state.homeNoticePosts.map((post) =>
          post.postId === action.payload ? { ...post, isRead: true } : post,
        ),
      ],
      noticePosts: [
        ...state.noticePosts.map((post) =>
          post.postId === action.payload ? { ...post, isRead: true } : post,
        ),
      ],
    }),

    setHomeNoticePosts: (state, action: PayloadAction<NoticePostPreview[]>) => ({
      ...state,
      homeNoticePosts: action.payload,
    }),
    setNoticePosts: (state, action: PayloadAction<NoticePostPreview[]>) => ({
      ...state,
      noticePosts: action.payload,
    }),
    setCommunityPosts: (state, action: PayloadAction<CommunityPostPreview[]>) => ({
      ...state,
      communityPosts: action.payload,
    }),

    addNoticePosts: (state, action: PayloadAction<NoticePostPreview[]>) => ({
      ...state,
      noticePosts: [...state.noticePosts, ...action.payload],
    }),
    addCommunityPosts: (state, action: PayloadAction<CommunityPostPreview[]>) => ({
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
  addNoticePosts,
  addCommunityPosts,
  resetHomeNoticePosts,
  resetNoticePosts,
  resetCommunityPosts,
} = posts.actions;
export default posts.reducer;
