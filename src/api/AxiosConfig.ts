import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add Authorization header from cookies
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Get token from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle unauthorized response (401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token"); // Remove token from cookies
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);
