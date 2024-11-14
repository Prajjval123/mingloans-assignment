// src/services/authService.js
import axios from "axios";

const LOGIN_URL = "https://dummyjson.com/auth/login";

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(LOGIN_URL, userData);
    return response.data; // { token, user data }
  } catch (error) {
    throw new Error("Login failed");
  }
};
