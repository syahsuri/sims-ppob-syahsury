import { axiosInstance } from "../AxiosConfig";

export interface TransactionRecord {
  invoice_number: string;
  transaction_type: "TOPUP" | "PAYMENT";
  description: string;
  total_amount: number;
  created_on: string;
}

export interface TransactionHistoryResponse {
  status: number;
  message: string;
  data: {
    offset: number;
    limit: number;
    records: TransactionRecord[];
  };
}

export const transactionApi = {
  getHistory: async (limit = 10, offset = 0): Promise<TransactionRecord[]> => {
    const response = await axiosInstance.get<TransactionHistoryResponse>(
      `/transaction/history?limit=${limit}&offset=${offset}`
    );
    return response.data.data.records;
  },

  pay: async (payload: { service_code: string }) => {
    const response = await axiosInstance.post<PaymentResponse>(
      "/transaction",
      payload
    );
    return response.data;
  },
};
