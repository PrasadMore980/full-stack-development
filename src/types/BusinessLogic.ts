// User Authentication Types
export interface AuthCredentials {
  username: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

// Business Operation Types
export interface BusinessOperationParams {
  [key: string]: any;
}

export interface BusinessOperationResult {
  operationType: string;
  success: boolean;
  result: string;
  data?: any;
}

// Metrics Types
export interface BusinessMetrics {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
}

// Configuration Types
export interface AppConfiguration {
  apiUrl: string;
  timeout: number;
  enableLogging: boolean;
}

// Device Info Types
export interface DeviceInfo {
  platform: string;
  version: string;
  model: string;
  name?: string; // iOS only
  manufacturer?: string; // Android only
}

// Event Logging Types
export interface LogEventParams {
  [key: string]: any;
}