import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
import slotsReducer from "./Features/slotSlice"
import reviewReducer from '../Redux/Features/reviewSlice';

const Store = configureStore({
    reducer: {
      auth: authReducer,
      slots: slotsReducer,
      reviews: reviewReducer,
    }
  });
  
  export default Store;