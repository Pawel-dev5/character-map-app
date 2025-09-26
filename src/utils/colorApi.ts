import axios, { type AxiosError } from "axios";
import i18n from "../i18n";
import type {
  ColorApiResponse,
  ColorNameResult,
  ApiError,
  ErrorType as ErrorTypeUnion,
} from "../types/api";
import { ErrorType } from "../types/api";

const mapErrorToType = (error: AxiosError): ErrorTypeUnion => {
  if (error?.code === "ECONNABORTED" || error?.code === "TIMEOUT") {
    return ErrorType.TIMEOUT;
  }

  if (!error?.response) {
    return ErrorType.NETWORK_ERROR;
  }

  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    return ErrorType.INVALID_COLOR;
  }

  if (error?.response?.status >= 500) {
    return ErrorType.API_ERROR;
  }

  return ErrorType.UNKNOWN;
};

const getErrorMessage = (
  errorType: ErrorTypeUnion,
  status?: number
): string => {
  switch (errorType) {
    case ErrorType.NETWORK_ERROR:
      return i18n.t("errors.network");
    case ErrorType.TIMEOUT:
      return i18n.t("errors.timeout");
    case ErrorType.INVALID_COLOR:
      return i18n.t("errors.invalidColor");
    case ErrorType.API_ERROR:
      return i18n.t("errors.apiError", { status });
    default:
      return i18n.t("errors.unknown");
  }
};

const isValidHexColor = (hex: string): boolean => {
  const cleanHex = hex?.replace("#", "");
  return /^[0-9A-Fa-f]{6}$/?.test(cleanHex || "");
};

export const fetchColorName = async (
  hexColor: string
): Promise<ColorNameResult> => {
  try {
    if (!isValidHexColor(hexColor)) {
      return {
        success: false,
        error: {
          message: i18n.t("errors.invalidFormat"),
          code: "INVALID_FORMAT",
        },
        errorType: ErrorType.INVALID_COLOR,
      };
    }

    const cleanHex = hexColor?.replace("#", "");

    const response = await axios.get<ColorApiResponse>(
      `https://www.thecolorapi.com/id`,
      {
        params: { hex: cleanHex },
        timeout: 5000,
      }
    );

    if (!response?.data?.name?.value) {
      return {
        success: false,
        error: {
          message: i18n.t("errors.invalidResponse"),
          code: "INVALID_RESPONSE",
        },
        errorType: ErrorType.API_ERROR,
      };
    }

    return {
      success: true,
      data: response?.data?.name?.value,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorType = mapErrorToType(error);
      const apiError: ApiError = {
        message: getErrorMessage(errorType, error?.response?.status),
        status: error?.response?.status,
        code: error?.code,
      };

      return { success: false, error: apiError, errorType };
    }

    return {
      success: false,
      error: {
        message: i18n.t("errors.unexpectedError"),
        code: "UNKNOWN_ERROR",
      },
      errorType: ErrorType.UNKNOWN,
    };
  }
};
