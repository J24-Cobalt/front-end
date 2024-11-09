// authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchHasMatchData,
  fetchUserData,
  loginUser,
  registerUser,
} from "@app/services/api/auth";
import { CompanyData, HasMatchesWCompanies, UserData } from "@features/types";

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
  userType: "applicant" | "company" | null;
  userData: UserData | null;
  companyData: CompanyData | null;
  matchedCompanies: HasMatchesWCompanies[] | null; // Store matched companies here
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

// Async thunk for loading user data and matched companies
export const loadUserData = createAsyncThunk<
  {
    userData: UserData | CompanyData;
    matchedCompanies: HasMatchesWCompanies[];
  },
  { email: string; userType: "applicant" | "company" },
  { rejectValue: string }
>("auth/loadUserData", async ({ email, userType }, thunkAPI) => {
  try {
    // Initiate both requests at the same time
    const [userData, matchedCompanies] = await Promise.all([
      fetchUserData(email, userType),
      fetchHasMatchData(email),
    ]);

    return { userData, matchedCompanies }; // Return both pieces of data
  } catch (error) {
    return thunkAPI.rejectWithValue(`Failed to load user data: ${error}`);
  }
});

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  userType: null,
  userData: null,
  companyData: null,
  matchedCompanies: null, // Initialize as null
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
      state.matchedCompanies = null;
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
        (
          state,
          action: PayloadAction<{
            userData: UserData | CompanyData;
            matchedCompanies: HasMatchesWCompanies[];
          }>
        ) => {
          state.loading = false;
          state.error = null;
          const { userData, matchedCompanies } = action.payload;

          if (state.userType === "applicant") {
            state.userData = userData as UserData;
            state.matchedCompanies = matchedCompanies;
          } else if (state.userType === "company") {
            state.companyData = userData as CompanyData;
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
