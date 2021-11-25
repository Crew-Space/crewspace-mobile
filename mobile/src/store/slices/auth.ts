import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const auth = createSlice({
  name: 'auth',
  initialState: {
    token: '',
  },
  reducers: {
    setToken: (_state, action: PayloadAction<{ token: string }>) => action.payload,
  },
});

export const { setToken } = auth.actions;
export default auth.reducer;
