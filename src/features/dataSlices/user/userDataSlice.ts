import { UserData } from "@features/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserDataState {
  user: UserData | null; // The current user data, or null if not loaded
  loading: boolean; // To indicate if data is being fetched
  error: string | null; // Error message, if there’s an error in loading
}

// Initial state for user data
const initialUserDataState: UserDataState = {
  user: null,
  loading: false,
  error: null,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState: initialUserDataState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    clearUserData: (state) => {
      state.user = null;
    },
    setUserDataLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserDataError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUserData,
  clearUserData,
  setUserDataLoading,
  setUserDataError,
} = userDataSlice.actions;
export default userDataSlice.reducer;
