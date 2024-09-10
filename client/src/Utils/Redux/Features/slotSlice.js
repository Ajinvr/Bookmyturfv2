import { createSlice } from '@reduxjs/toolkit';

const slotsSlice = createSlice({
  name: 'slots',
  initialState: {
    selectedSlots: [],
  },
  reducers: {
    setSelectedSlots: (state, action) => {
      state.selectedSlots = action.payload;
    },
  },
});

export const { setSelectedSlots } = slotsSlice.actions;
export default slotsSlice.reducer;
