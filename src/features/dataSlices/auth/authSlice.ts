// authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserData, loginUser, registerUser } from "@app/services/api/auth";
import { CompanyData, UserData } from "@features/types";

export interface UserAuth {
  id: string;
  fullname: string;
  email: string;
  isCompany?: boolean;
}

// Auth state interface
interface AuthState {
  isAuthenticated: boolean;
  user: UserAuth | null;
  userType: "applicant" | "company" | null; // Track the user type in state
  userData: UserData | null; // User-specific data
  companyData: CompanyData | null; // Company-specific data
  loading: boolean;
  error: string | null;
}

export const login = createAsyncThunk<
  UserAuth,
  { email: string; password: string; userType: "applicant" | "company" },
  { rejectValue: string }
>("auth/login", async ({ email, password, userType }, thunkAPI) => {
  try {
    const user = await loginUser(email, password, userType);
    user.isCompany = userType === "company"; // Determine if it's a company based on userType
    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Invalid email, password, or user type`);
    console.log(error);
  }
});

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

// Async thunk for loading user data
export const loadUserData = createAsyncThunk<
  UserData | CompanyData,
  { email: string; userType: "applicant" | "company" },
  { rejectValue: string }
>("auth/loadUserData", async ({ email, userType }, thunkAPI) => {
  try {
    const data = await fetchUserData(email, userType);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Failed to load user data: ${error}`);
  }
});

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  userType: null, // Initialize userType as null
  userData: null,
  companyData: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userType = null;
      state.userData = null;
      state.companyData = null;
      state.error = null;
      localStorage.removeItem("authToken");
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
        state.userType = action.payload.isCompany ? "company" : "applicant"; // Set userType based on isCompany
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
        state.userType = "applicant"; // Assuming registration is for "applicant"
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload || "Registration failed";
        state.loading = false;
      })
      .addCase(loadUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadUserData.fulfilled,
        (state, action: PayloadAction<UserData | CompanyData>) => {
          state.loading = false;
          state.error = null;
          if (state.userType === "applicant") {
            state.userData = action.payload as UserData;
          } else if (state.userType === "company") {
            state.companyData = action.payload as CompanyData;
          }
        }
      )
      .addCase(loadUserData.rejected, (state, action) => {
        state.error = action.payload || "Failed to load user data";
        state.loading = false;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
