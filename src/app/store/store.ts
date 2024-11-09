// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@features/dataSlices/auth/authSlice";
import companyReducer from "@features/dataSlices/company/matchingCompanySlice"; // Add the company slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer, // Include company slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
