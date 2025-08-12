// User related types
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  company: string;
  mobile: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserResponse {
  firstName: string;
  lastName: string;
  company: string;
}

// Auth related types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  company?: string;
  mobile?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  user?: UserResponse;
  error?: string;
}

// Token payload
export interface TokenPayload {
  id: string;
  email: string;
  [key: string]: any;
}

// Customer related types
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalRepairs: number;
  lastVisit: string;
  status: 'Active' | 'VIP' | 'Inactive';
  notes: string;
}

// Dashboard stats
export interface DashboardStats {
  totalCustomers: number;
  activeRepairs: number;
  lowStockItems: number;
  monthlyRevenue: number;
}

export interface RepairStatus {
  pending: number;
  inProgress: number;
  completed: number;
  issues: number;
}

export interface PerformanceMetrics {
  avgRepairTime: string;
  customerSatisfaction: string;
  repeatCustomers: string;
  onTimeCompletion: string;
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}
