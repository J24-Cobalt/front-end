import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8001";

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

// Login API call for applicant or company based on userType
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
    return response.data; // Assuming the response includes the user data or token
  } catch (error) {
    throw new Error(`Login failed: ${error}`);
  }
};

// Fetch user by email
export const fetchUser = async (email: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/applicant/${email}`);
    return response.data; // Assuming the response includes the user data
  } catch (error) {
    throw new Error(`Failed to fetch user data: ${error}`);
  }
};
