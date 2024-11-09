import { fetchUser, loginUser } from "@app/services/api/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const user = await loginUser(email, password);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue("Invalid email or password");
    }
  }
);

// Async thunk for fetching user data
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (email: string, thunkAPI) => {
    try {
      const userData = await fetchUser(email);
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load user data");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
