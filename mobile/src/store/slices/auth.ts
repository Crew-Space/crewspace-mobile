import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  token: string | undefined;
  isAdmin: boolean;
} = {
  token: undefined,
  isAdmin: false,
};

export const auth = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => ({ ...state, token: action.payload }),
    setIsAdmin: (state, action: PayloadAction<boolean>) => ({ ...state, isAdmin: action.payload }),
  },
});

export const { setToken, setIsAdmin } = auth.actions;
export default auth.reducer;
