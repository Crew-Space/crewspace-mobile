import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { File } from 'types';
import { ReqNewPost } from 'types/Response';

const initialState: Omit<ReqNewPost, 'postCategoryId'> = {
  image: [],
  description: '',
};

export const newPost = createSlice({
  name: 'newPost',
  initialState: initialState,
  reducers: {
    setDescription: (state, action: PayloadAction<string>) => ({
      ...state,
      description: action.payload,
    }),
    setImages: (state, action: PayloadAction<File[]>) => ({
      ...state,
      image: action.payload,
    }),
  },
});

export const { setDescription, setImages } = newPost.actions;
export default newPost.reducer;
