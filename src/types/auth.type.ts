export interface Auth {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface LoginResponse {
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
