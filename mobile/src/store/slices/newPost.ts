import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { File, PostType } from 'types';
import { ReqNewNoticePost, ReqNewPost } from 'types/Response';

type NewPostType = {
  notice: Omit<ReqNewNoticePost, 'postCategoryId'>;
  community: Omit<ReqNewPost, 'postCategoryId'>;
};

const initialState: NewPostType = {
  community: {
    image: [],
    description: '',
  },
  notice: {
    image: [],
    description: '',
    title: '',
    targets: [],
    isReserved: false,
    reservedTime: '',
  },
};

export const newPost = createSlice({
  name: 'newPost',
  initialState: initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<{ postType: PostType; title: string }>) => ({
      ...state,
      [action.payload.postType]: {
        ...state[action.payload.postType],
        title: action.payload.title,
      },
    }),
    setDescription: (
      state,
      action: PayloadAction<{ postType: PostType; description: string }>,
    ) => ({
      ...state,
      [action.payload.postType]: {
        ...state[action.payload.postType],
        description: action.payload.description,
      },
    }),
    setImages: (state, action: PayloadAction<{ postType: PostType; image: File[] }>) => ({
      ...state,
      [action.payload.postType]: {
        ...state[action.payload.postType],
        image: action.payload.image,
      },
    }),
    setTargets: (state, action: PayloadAction<{ postType: PostType; targets: number[] }>) => ({
      ...state,
      [action.payload.postType]: {
        ...state[action.payload.postType],
        targets: action.payload.targets,
      },
    }),
  },
});

export const { setDescription, setImages, setTitle, setTargets } = newPost.actions;
export default newPost.reducer;
