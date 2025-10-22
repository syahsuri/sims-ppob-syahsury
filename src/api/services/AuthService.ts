import Cookies from "js-cookie";
import { axiosInstance } from "../AxiosConfig";
import type { Auth, LoginCredentials, RegisterData } from "@/types/auth.type";

export const authApi = {
  login: async (credentials: LoginCredentials)=> {
    const response = await axiosInstance.post(
      "/login",
      credentials
    );
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await axiosInstance.post(
      "/registration",
      data
    );
    return response.data;
  },

  logout: (): void => {
    Cookies.remove("token");
  },

  getProfile: async (): Promise<Auth> => {
    const response = await axiosInstance.get<Auth>("/profile");
    return response.data;
  },
};
