export interface User {
  id: string;
  email: string;
  emailHash: string;
  signature: string;
  role: string;
  status: string;
  createdAt: string;
}

export interface ChartData {
  date: string;
  totalUsers: number;
}
