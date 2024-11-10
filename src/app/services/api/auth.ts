// auth.ts
import { CompanyData, HasMatchedCompanies, HasMatchesWCompanies, UserData } from "@features/types";
import axios from "axios";

const API_BASE_URL = "https://136.244.85.199:8001";
console.log(API_BASE_URL);

// Register user (applicant)
export const registerUser = async (userData: {
  fullname: string;
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/applicant/register`,
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to register user: ${error}`);
  }
};

// loginUser now returns an object with email and other details
export const loginUser = async (
  email: string,
  password: string,
  userType: "applicant" | "company"
) => {
  const endpoint =
    userType === "applicant" ? "/applicant/login" : "/company/login";

  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
      email,
      password,
    });

    if (response.data?.message === "logged in successfully") {
      return { email, isCompany: userType === "company", ...response.data }; // Include email in the response
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw new Error(`Login failed: ${error}`);
  }
};

// Fetch user by email
export const fetchUser = async (email: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/applicant/${email}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user data: ${error}`);
  }
};

// Fetch user by email for applicant or company
export const fetchUserData = async (email: string, userType: "applicant" | "company") => {
  console.log(`email: ${email}, userType: ${userType}`);
  const endpoint = userType === "applicant" ? `/applicant/${email}` : `/company/${email}`;
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`);
    return response.data as UserData | CompanyData;
  } catch (error) {
    throw new Error(`Failed to fetch user data: ${error}`);
  }
};

// Fetch only has_matched data by email
export const fetchHasMatchData = async (
  email: string
): Promise<HasMatchesWCompanies[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/matching/applicant/${email}`
    );
    const hasMatchData = response.data || []; // Access data directly from response

    // Ensure the result is an array of matched companies
    return hasMatchData as HasMatchesWCompanies[];
  } catch (error) {
    console.error(`Failed to fetch matched companies: ${error}`);
    throw new Error(`Failed to fetch matched companies: ${error}`);
  }
};

// Fetch only has_matched data by email
export const fetchHasMatchesData = async (
  email: string
): Promise<HasMatchedCompanies[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/matching/applicant/${email}`
    );
    const hasMatchData = response.data || []; // Access data directly from response
    console.log(hasMatchData);

    // Ensure the result is an array of matched companies
    return hasMatchData as HasMatchedCompanies[];
  } catch (error) {
    console.error(`Failed to fetch matched companies: ${error}`);
    throw new Error(`Failed to fetch matched companies: ${error}`);
  }
};