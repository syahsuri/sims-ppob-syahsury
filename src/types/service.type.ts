export interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export interface UiService {
  name: string;
  icon: string;
  code: string
  tariff: number
}

export interface ServiceResponse {
  status: number;
  message: string;
  data: Service[];
}
