import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isOpen: boolean;
} = {
  isOpen: false,
};

export const sideMenu = createSlice({
  name: 'sideMenu',
  initialState: initialState,
  reducers: {
    toggleSideMenu: (state, _action: PayloadAction<void>) => ({ isOpen: !state.isOpen }),
  },
});

export const { toggleSideMenu } = sideMenu.actions;
export default sideMenu.reducer;
