import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem('userdata'))?.isAuthenticated || false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      const userdata = JSON.parse(localStorage.getItem('userdata')) || {};
      userdata.isAuthenticated = true;
      localStorage.setItem('userdata', JSON.stringify(userdata));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      const userdata = JSON.parse(localStorage.getItem('userdata')) || {};
      userdata.isAuthenticated = false;
      localStorage.setItem('userdata', JSON.stringify(userdata));
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
