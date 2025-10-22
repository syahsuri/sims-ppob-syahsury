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
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}


