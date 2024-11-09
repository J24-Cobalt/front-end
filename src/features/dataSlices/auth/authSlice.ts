import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "@app/services/api/auth";

// Define UserAuth for login response and registration
export interface UserAuth {
  id: string;
  fullname: string;
  email: string;
}

// Auth state interface
interface AuthState {
  isAuthenticated: boolean;
  user: UserAuth | null;
  loading: boolean;
  error: string | null;
}

const userType = "company";

// Async thunk for login
export const login = createAsyncThunk<
  UserAuth,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const user = await loginUser(email, password, userType);
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Invalid email or password: ${error}`);
  }
});

// Async thunk for register
export const register = createAsyncThunk<
  UserAuth,
  { fullname: string; username: string; email: string; password: string },
  { rejectValue: string }
>(
  "auth/register",
  async ({ fullname, username, email, password }, thunkAPI) => {
    try {
      const newUser = await registerUser({
        fullname,
        username,
        email,
        password,
      });
      return newUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Registration failed: ${error}`);
    }
  }
);

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Enhanced logout reducer to clear all user data
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      // Clear any stored token or session info
      localStorage.removeItem("authToken"); // Example of clearing stored token
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserAuth>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload || "Login failed";
        state.loading = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<UserAuth>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload || "Registration failed";
        state.loading = false;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
