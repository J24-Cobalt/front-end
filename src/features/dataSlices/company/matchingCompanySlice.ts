// companySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HasMatched } from "@features/types";

interface CompanyState {
  selectedCompany: HasMatched | null;
}

const initialState: CompanyState = {
  selectedCompany: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setSelectedCompany: (state, action: PayloadAction<HasMatched>) => {
      state.selectedCompany = action.payload;
    },
    clearSelectedCompany: (state) => {
      state.selectedCompany = null;
    },
  },
});

export const { setSelectedCompany, clearSelectedCompany } =
  companySlice.actions;
export default companySlice.reducer;
