import { axiosInstance } from "../AxiosConfig";

export interface TopupResponse {
  top_up_amount: number;
}

export const topupApi = {
  topup: async (amount: number): Promise<TopupResponse> => {
    const response = await axiosInstance.post<TopupResponse>("/topup", { top_up_amount: amount });
    return response.data;
  },
};
