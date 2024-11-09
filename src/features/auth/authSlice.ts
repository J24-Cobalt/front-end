import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for authentication
interface AuthState {
  isAuthenticated: boolean;
  user: {
    fullname: string;
    username: string;
    email: string;
    avatar: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
