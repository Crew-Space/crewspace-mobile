import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from 'types/Response';
import { MainRouterParamList } from 'types/Route';

export const screen = createSlice({
  name: 'screen',
  initialState: {
    tabName: '',
    category: {
      categoryName: '',
      categoryId: -1,
    },
  },
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
