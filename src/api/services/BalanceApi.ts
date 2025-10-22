import { axiosInstance } from "../AxiosConfig";

export interface BalanceResponse {
  status: number;
  message: string;
  data: {
    balance: number;
  };
}

export const balanceApi = {
  getBalance: async (): Promise<number> => {
    const response = await axiosInstance.get<BalanceResponse>("/balance");
    return response.data.data.balance;
  },
};
