import axios from "axios";

const LOGIN_URL = "https://dummyjson.com/auth/login";

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(LOGIN_URL, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data?.message || "Invalid credentials";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("No response from server. Please check your network.");
    } else {
      throw new Error(`An unexpected error occurred: ${error.message}`);
    }
  }
};
