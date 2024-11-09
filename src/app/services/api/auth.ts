import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8001";

// Register user
export const registerUser = async (userData: {
  fullname: string;
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(API_BASE_URL, {
      fullname: userData.fullname,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      // You can add other optional data fields if needed
    });
    return response.data; // Assuming the response is the user object
  } catch (error) {
    throw new Error(`Failed to register user ${error}`);
  }
};

// Login API call
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/applicant/`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Login failed ${error}`);
  }
};

// Fetch user by email
export const fetchUser = async (email: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/applicant/${email}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user data ${error}`);
  }
};