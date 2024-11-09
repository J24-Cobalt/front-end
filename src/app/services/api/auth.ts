import axios from "axios";

const API_URL = "http://your-api-url.com/register"; // Replace with your actual API URL

// Register user
export const registerUser = async (userData: {
  fullname: string;
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(API_URL, {
      fullname: userData.fullname,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      // You can add other optional data fields if needed
    });
    return response.data; // Assuming the response is the user object
  } catch (error) {
    throw new Error("Failed to register user");
  }
};
