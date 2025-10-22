import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token"); 
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

