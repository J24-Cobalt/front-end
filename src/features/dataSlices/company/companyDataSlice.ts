import { CompanyData, Job } from "@features/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompanyDataState {
  company: CompanyData | null; // The current company data, or null if not loaded
  loading: boolean; // To indicate if data is being fetched
  error: string | null; // Error message, if there’s an error in loading
}

// Initial state for company data
const initialCompanyDataState: CompanyDataState = {
  company: null,
  loading: false,
  error: null,
};

const companyDataSlice = createSlice({
  name: "companyData",
  initialState: initialCompanyDataState,
  reducers: {
    setCompanyData: (state, action: PayloadAction<CompanyData>) => {
      state.company = action.payload;
    },
    clearCompanyData: (state) => {
      state.company = null;
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.company?.jobs.push(action.payload);
    },
    setCompanyDataLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCompanyDataError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCompanyData,
  clearCompanyData,
  addJob,
  setCompanyDataLoading,
  setCompanyDataError,
} = companyDataSlice.actions;
export default companyDataSlice.reducer;
