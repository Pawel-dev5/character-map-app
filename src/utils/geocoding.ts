import axios, { type AxiosError } from 'axios';
import i18n from '../i18n';
import type { GeoCoordinates } from '../types/map';
import type { GeocodingResult, ApiError, ErrorType as ErrorTypeUnion } from '../types/api';
import { ErrorType } from '../types/api';

export interface GeocodeResponse {
	place_id: number;
	licence: string;
	osm_type: string;
	osm_id: number;
	lat: string;
	lon: string;
	class: string;
	type: string;
	place_rank: number;
	importance: number;
	addresstype: string;
	name: string;
	display_name: string;
	boundingbox: string[];
}

export interface AddressSuggestion {
	id: string;
	displayName: string;
	coordinates: {
		lat: number;
		lon: number;
	};
}

const mapErrorToType = (error: AxiosError): ErrorTypeUnion => {
	if (error?.code === 'ECONNABORTED' || error?.code === 'TIMEOUT') {
		return ErrorType.TIMEOUT;
	}

	if (!error?.response) {
		return ErrorType.NETWORK_ERROR;
	}

	if (error?.response?.status >= 400 && error?.response?.status < 500) {
		return ErrorType.INVALID_ADDRESS;
	}

	if (error?.response?.status >= 500) {
		return ErrorType.GEOCODING_ERROR;
	}

	return ErrorType.UNKNOWN;
};

const getErrorMessage = (errorType: ErrorTypeUnion): string => {
	switch (errorType) {
		case ErrorType.NETWORK_ERROR:
			return i18n.t('errors.network');
		case ErrorType.TIMEOUT:
			return i18n.t('errors.timeout');
		case ErrorType.INVALID_ADDRESS:
			return i18n.t('errors.invalidAddress');
		case ErrorType.GEOCODING_ERROR:
			return i18n.t('errors.geocodingError');
		default:
			return i18n.t('errors.unknown');
	}
};

export const getAddressSuggestions = async (query: string): Promise<GeocodingResult<AddressSuggestion[]>> => {
	if (!query.trim() || query.trim().length < 3) {
		return {
			success: false,
			error: {
				message: i18n.t('errors.invalidAddress'),
				code: 'QUERY_TOO_SHORT',
			},
			errorType: ErrorType.INVALID_ADDRESS,
		};
	}

	try {
		const response = await axios.get<GeocodeResponse[]>(`https://nominatim.openstreetmap.org/search`, {
			params: {
				format: 'json',
				q: query,
				limit: 5,
				addressdetails: 1,
			},
			timeout: 5000,
		});

		const data = response.data;

		const suggestions = data?.map((item) => ({
			id: item?.place_id?.toString(),
			displayName: item?.display_name,
			coordinates: {
				lat: parseFloat(item?.lat),
				lon: parseFloat(item?.lon),
			},
		}));

		return {
			success: true,
			data: suggestions,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const errorType = mapErrorToType(error);
			const apiError: ApiError = {
				message: getErrorMessage(errorType),
				status: error?.response?.status,
				code: error?.code,
			};

			return { success: false, error: apiError, errorType };
		}

		return {
			success: false,
			error: {
				message: i18n.t('errors.unexpectedError'),
				code: 'UNKNOWN_ERROR',
			},
			errorType: ErrorType.UNKNOWN,
		};
	}
};

export const geocodeAddress = async (address: string): Promise<GeocodingResult<GeoCoordinates>> => {
	if (!address?.trim()) {
		return {
			success: false,
			error: {
				message: i18n.t('errors.invalidAddress'),
				code: 'EMPTY_ADDRESS',
			},
			errorType: ErrorType.INVALID_ADDRESS,
		};
	}

	try {
		const response = await axios.get<GeocodeResponse[]>(`https://nominatim.openstreetmap.org/search`, {
			params: {
				format: 'json',
				q: address,
				limit: 1,
				addressdetails: 1,
			},
			timeout: 5000,
		});

		const data = response.data;

		if (data?.length === 0) {
			return {
				success: false,
				error: {
					message: i18n.t('errors.invalidAddress'),
					code: 'ADDRESS_NOT_FOUND',
				},
				errorType: ErrorType.INVALID_ADDRESS,
			};
		}

		const result = data?.[0];
		const coordinates = {
			latitude: parseFloat(result?.lat),
			longitude: parseFloat(result?.lon),
			address: result?.display_name,
		};

		return {
			success: true,
			data: coordinates,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const errorType = mapErrorToType(error);
			const apiError: ApiError = {
				message: getErrorMessage(errorType),
				status: error?.response?.status,
				code: error?.code,
			};

			return { success: false, error: apiError, errorType };
		}

		return {
			success: false,
			error: {
				message: i18n.t('errors.unexpectedError'),
				code: 'UNKNOWN_ERROR',
			},
			errorType: ErrorType.UNKNOWN,
		};
	}
};
