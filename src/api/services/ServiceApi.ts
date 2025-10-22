import type { ServiceResponse, UiService } from "@/types/service.type";
import { axiosInstance } from "../AxiosConfig";

export const serviceApi = {
    getAllServices: async (): Promise<UiService[]> => {
      const response = await axiosInstance.get<ServiceResponse>("/services");
      return response.data.data.map((item) => ({
        code: item.service_code,
        name: item.service_name,
        icon: item.service_icon,
        tariff: item.service_tariff,
      }));
    },
  };
  