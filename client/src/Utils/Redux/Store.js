import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
import slotsReducer from "./Features/slotSlice"

const Store = configureStore({
    reducer: {
      auth: authReducer,
      slots: slotsReducer,
    }
  });
  
  export default Store;