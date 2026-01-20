// loanTypesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loanTypesSlice = createSlice({
  name: "loanTypes",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    setLoanTypes: (state, action) => {
      state.list = action.payload;
    },
    addLoanType: (state, action) => {
      state.list.unshift(action.payload);
    },
    removeLoanType: (state, action) => {
      state.list = state.list.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setLoanTypes,
  addLoanType,
  removeLoanType,
} = loanTypesSlice.actions;

export default loanTypesSlice.reducer;
