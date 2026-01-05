import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import loanApplicationReducer from "./slices/loanApplicationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loanApplication: loanApplicationReducer
  }
});
