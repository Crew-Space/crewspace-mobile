import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from 'types';
import { MainRouterParamList, RootRouterParamList } from 'types/Route';

const initialState: {
  tabName: keyof MainRouterParamList | keyof Pick<RootRouterParamList, 'Post'>;
  category: Category;
} = {
  tabName: 'Home',
  category: {
    categoryName: '',
    categoryId: -1,
  },
};

export const screen = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setTabName: (state, action: PayloadAction<keyof MainRouterParamList>) => ({
      ...state,
      tabName: action.payload,
    }),
    setCategory: (state, action: PayloadAction<Category>) => ({
      ...state,
      category: action.payload,
    }),
  },
});

export const { setTabName, setCategory } = screen.actions;
export default screen.reducer;
