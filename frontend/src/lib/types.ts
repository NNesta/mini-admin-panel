export interface User {
  id: string;
  email: string;
  emailHash: string;
  signature: string;
  role: string;
  status: string;
  createdAt: string;
  isValid: boolean;
}

export interface ChartData {
  date: string;
  totalUsers: number;
}

export interface ErrorResponse {
  message: string;
  status: number;
}
