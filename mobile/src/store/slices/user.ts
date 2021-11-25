import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  spaceId: number;
  userId: string;
}

export const user = createSlice({
  name: 'user',
  initialState: { spaceId: -1, userId: '' },
  reducers: {
    setUser: (_state, action: PayloadAction<User>) => action.payload,
    setSpaceId: (state, action: PayloadAction<number>) => {
      return { ...state, spaceId: action.payload };
    },
    setUserId: (state, action: PayloadAction<string>) => {
      return { ...state, userId: action.payload };
    },
  },
});

export const { setUser, setSpaceId, setUserId } = user.actions;
export default user.reducer;
