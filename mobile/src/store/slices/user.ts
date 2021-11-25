import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  spaceId: number;
  userId: string;
}

export const users = createSlice({
  name: 'user',
  initialState: {},
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

export const { setUser, setSpaceId, setUserId } = users.actions;
export default users.reducer;
