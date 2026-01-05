import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000/api/loan-applications";

/* =======================
   THUNK (API CALL)
======================= */
export const submitLoanApplication = createAsyncThunk(
  "loanApplication/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, formData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Submission failed"
      );
    }
  }
);

/* =======================
   SLICE
======================= */
const loanApplicationSlice = createSlice({
  name: "loanApplication",
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null
  },
  reducers: {
    resetLoanState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitLoanApplication.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitLoanApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(submitLoanApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetLoanState } = loanApplicationSlice.actions;
export default loanApplicationSlice.reducer;
