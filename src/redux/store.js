import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import loanTypesReducer from "./slices/loanTypesSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    loanTypes: loanTypesReducer,
  },
});
