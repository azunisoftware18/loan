import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import loanTypesReducer from "./slices/loanTypesSlice";

import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// 👇 Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  loanTypes: loanTypesReducer,
});

// 👇 Sirf auth persist karna hai
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // 👈 only auth will persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);