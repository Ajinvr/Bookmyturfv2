import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
  },
  reducers: {
    setReviews: (state, action) => {
      state. reviews = action.payload;
    },
  },
});

export const { setReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
