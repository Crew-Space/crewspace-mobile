import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SPACE_INITAL_ID } from 'store/services';
import { Space } from 'types';

const initialState: { current: Space; mySpaces: Space[] } = {
  current: {
    spaceId: SPACE_INITAL_ID,
    spaceName: '',
    spaceImage: '',
  },
  mySpaces: [],
};

export const space = createSlice({
  name: 'space',
  initialState,
  reducers: {
    setCurrentSpace: (state, action: PayloadAction<Space>) => ({
      ...state,
      current: action.payload,
    }),
    setMySpaces: (state, action: PayloadAction<Space[]>) => ({
      ...state,
      mySpaces: action.payload,
    }),
  },
});

export const { setCurrentSpace, setMySpaces } = space.actions;
export default space.reducer;
