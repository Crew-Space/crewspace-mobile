import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  token: string | undefined;
} = {
  token: undefined,
};

export const auth = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken: (_state, action: PayloadAction<{ token: string }>) => action.payload,
  },
});

export const { setToken } = auth.actions;
export default auth.reducer;
