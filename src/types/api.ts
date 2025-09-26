export interface ColorApiResponse {
  name: {
    value: string;
  };
  hex: {
    value: string;
  };
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export type ErrorType =
  | "NETWORK_ERROR"
  | "API_ERROR"
  | "INVALID_COLOR"
  | "TIMEOUT"
  | "UNKNOWN"
  | "GEOCODING_ERROR"
  | "INVALID_ADDRESS";

export const ErrorType = {
  NETWORK_ERROR: "NETWORK_ERROR" as const,
  API_ERROR: "API_ERROR" as const,
  INVALID_COLOR: "INVALID_COLOR" as const,
  TIMEOUT: "TIMEOUT" as const,
  UNKNOWN: "UNKNOWN" as const,
  GEOCODING_ERROR: "GEOCODING_ERROR" as const,
  INVALID_ADDRESS: "INVALID_ADDRESS" as const,
} as const;

export interface ColorNameResult {
  success: boolean;
  data?: string;
  error?: ApiError;
  errorType?: ErrorType;
}

export interface GeocodingResult<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  errorType?: ErrorType;
}
