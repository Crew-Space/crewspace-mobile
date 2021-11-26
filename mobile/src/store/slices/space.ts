import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SPACE_INITAL_ID } from 'store/services';
import { Space } from 'types/Response';

export const space = createSlice({
  name: 'space',
  initialState: {
    spaceId: SPACE_INITAL_ID,
    spaceName: '',
    spaceImage: '',
  },
  reducers: {
    setSpace: (_state, action: PayloadAction<Space>) => action.payload,
  },
});

export const { setSpace } = space.actions;
export default space.reducer;
