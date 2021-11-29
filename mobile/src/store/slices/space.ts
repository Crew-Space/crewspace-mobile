import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SPACE_INITAL_ID } from 'store/services';
import { Space } from 'types';

export const space = createSlice({
  name: 'space',
  initialState: {
    spaceId: SPACE_INITAL_ID,
    spaceName: '',
    spaceImage: '',
  },
  reducers: {
    setSpace: (_state, action: PayloadAction<Space>) => action.payload,
    setSpaceId: (state, action: PayloadAction<number>) => ({ ...state, spaceId: action.payload }),
  },
});

export const { setSpace, setSpaceId } = space.actions;
export default space.reducer;
