// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = `${import.meta.env.VITE_API_BASE_URL}/loan-applications`;

// // =======================
// // 🔥 ASYNC THUNK (YAHI AXIOS.POST)
// // =======================
// export const submitLoanApplication = createAsyncThunk(
//   "loanApplication/submit",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(
//         API_URL,
//         payload, // ✅ PURE JSON
//         { withCredentials: true }
//       );
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Loan application failed"
//       );
//     }
//   }
// );


// // =======================
// // SLICE
// // =======================
// const loanApplicationSlice = createSlice({
//   name: "loanApplication",
//   initialState: {
//     loading: false,
//     success: false,
//     error: null,
//     data: null,
//   },
//   reducers: {
//     resetLoanApplicationState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//       state.data = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // 🔄 pending
//       .addCase(submitLoanApplication.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })

//       // ✅ success
//       .addCase(submitLoanApplication.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.data = action.payload;
//       })

//       // ❌ error
//       .addCase(submitLoanApplication.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetLoanApplicationState } =
//   loanApplicationSlice.actions;

// export default loanApplicationSlice.reducer;
