import Cookies from "js-cookie";
import { axiosInstance } from "../AxiosConfig";
import type {
  LoginCredentials,
  RegisterData,
  UserProfile,
} from "@/types/auth.type";

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await axiosInstance.post("/registration", data);
    return response.data;
  },

  logout: (): void => {
    Cookies.remove("token");
  },

  getProfile: async () => {
    const response = await axiosInstance.get<{ data: UserProfile }>("/profile");
    return response.data.data;
  },

  updateProfile: async (data: { first_name: string; last_name: string }) => {
    const response = await axiosInstance.put("/profile/update", data);
    return response.data.data;
  },

  uploadProfileImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/profile/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.data;
  },
};
