import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
const Store = configureStore({
    reducer: {
      auth: authReducer,
    }
  });
  
  export default Store;