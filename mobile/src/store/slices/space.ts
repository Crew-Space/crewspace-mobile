import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Space } from 'types/Response';

export const space = createSlice({
  name: 'space',
  initialState: {
    spaceId: -1,
    spaceName: '',
    spaceImage: '',
  },
  reducers: {
    setSpace: (_state, action: PayloadAction<Space>) => action.payload,
  },
});

export const { setSpace } = space.actions;
export default space.reducer;
