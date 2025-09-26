import { useState, useCallback } from "react";
import { fetchColorName as fetchColorNameApi } from "../utils/colorApi";
import type { ApiError, ErrorType } from "../types/api";

interface UseColorNameState {
  loading: boolean;
  error: ApiError | null;
  errorType: ErrorType | null;
}

export const useColorName = () => {
  const [state, setState] = useState<UseColorNameState>({
    loading: false,
    error: null,
    errorType: null,
  });

  const fetchColorName = useCallback(
    async (hexColor: string): Promise<string | null> => {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        errorType: null,
      }));

      try {
        const result = await fetchColorNameApi(hexColor);

        if (result?.success) {
          setState((prev) => ({ ...prev, loading: false }));
          return result?.data || null;
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: result?.error || { message: "Unknown error" },
            errorType: result?.errorType || "UNKNOWN",
          }));
          return null;
        }
      } catch (err) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: {
            message:
              err instanceof Error ? err?.message : "Unexpected error occurred",
          },
          errorType: "UNKNOWN",
        }));
        return null;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null, errorType: null }));
  }, []);

  return {
    fetchColorName,
    loading: state?.loading,
    error: state?.error?.message || null,
    errorType: state?.errorType,
    clearError,
    isNetworkError: state?.errorType === "NETWORK_ERROR",
    isTimeoutError: state?.errorType === "TIMEOUT",
    isInvalidColorError: state?.errorType === "INVALID_COLOR",
  };
};
