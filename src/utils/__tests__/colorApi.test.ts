import axios from 'axios';
import { fetchColorName } from '../colorApi';
import { ErrorType } from '../../types/api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../../i18n', () => ({
	__esModule: true,
	default: {
		t: jest.fn((key: string, options?: any) => {
			const messages: Record<string, string> = {
				'errors.network': 'Network error',
				'errors.timeout': 'Timeout error',
				'errors.invalidColor': 'Invalid color',
				'errors.apiError': `API error (${options?.status})`,
				'errors.unknown': 'Unknown error',
				'errors.invalidFormat': 'Invalid format',
				'errors.invalidResponse': 'Invalid response',
				'errors.unexpectedError': 'Unexpected error',
			};
			return messages[key] || key;
		}),
	},
}));

describe('fetchColorName', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('input validation', () => {
		it('should reject invalid hex colors', async () => {
			const invalidColors = ['', 'invalid', '#gg0000', '12345', '#12345'];

			await Promise.all(
				invalidColors.map(async (color) => {
					const result = await fetchColorName(color);

					expect(result.success).toBe(false);
					expect(result.errorType).toBe(ErrorType.INVALID_COLOR);
					expect(result.error?.code).toBe('INVALID_FORMAT');
				}),
			);
		});

		it('should accept valid hex colors', async () => {
			mockedAxios.get.mockResolvedValue({
				data: { name: { value: 'Red' } },
				status: 200,
			});

			const validColors = ['#ff0000', '#FF0000', 'ff0000', '#123abc'];

			await Promise.all(
				validColors.map(async (color) => {
					mockedAxios.get.mockClear();
					mockedAxios.get.mockResolvedValue({
						data: { name: { value: 'Test Color' } },
						status: 200,
					});

					const result = await fetchColorName(color);

					expect(result.success).toBe(true);
				}),
			);
		});
	});

	describe('successful API calls', () => {
		it('should return color name on successful API response', async () => {
			const mockResponse = {
				data: { name: { value: 'Forest Green' } },
				status: 200,
			};

			mockedAxios.get.mockResolvedValue(mockResponse);

			const result = await fetchColorName('#059669');

			expect(result.success).toBe(true);
			expect(result.data).toBe('Forest Green');
			expect(mockedAxios.get).toHaveBeenCalledWith('https://www.thecolorapi.com/id', {
				params: { hex: '059669' },
				timeout: 5000,
			});
		});

		it('should handle hex colors with and without # prefix', async () => {
			const mockResponse = {
				data: { name: { value: 'Blue' } },
				status: 200,
			};

			mockedAxios.get.mockResolvedValue(mockResponse);

			// With # prefix
			await fetchColorName('#0000ff');
			expect(mockedAxios.get).toHaveBeenCalledWith('https://www.thecolorapi.com/id', {
				params: { hex: '0000ff' },
				timeout: 5000,
			});

			mockedAxios.get.mockClear();

			// Without # prefix
			await fetchColorName('0000ff');
			expect(mockedAxios.get).toHaveBeenCalledWith('https://www.thecolorapi.com/id', {
				params: { hex: '0000ff' },
				timeout: 5000,
			});
		});
	});

	describe('API error handling', () => {
		it('should handle invalid response structure', async () => {
			mockedAxios.get.mockResolvedValue({
				data: {},
				status: 200,
			});

			const result = await fetchColorName('#ff0000');

			expect(result.success).toBe(false);
			expect(result.errorType).toBe(ErrorType.API_ERROR);
			expect(result.error?.code).toBe('INVALID_RESPONSE');
		});

		it('should handle network errors', async () => {
			const networkError = new Error('Network Error');
			delete (networkError as any).response;
			mockedAxios.get.mockRejectedValue(networkError);
			mockedAxios.isAxiosError.mockReturnValue(true);

			const result = await fetchColorName('#ff0000');

			expect(result.success).toBe(false);
			expect(result.errorType).toBe(ErrorType.NETWORK_ERROR);
		});

		it('should handle timeout errors', async () => {
			const timeoutError = new Error('Timeout');
			(timeoutError as any).code = 'TIMEOUT';
			mockedAxios.get.mockRejectedValue(timeoutError);
			mockedAxios.isAxiosError.mockReturnValue(true);

			const result = await fetchColorName('#ff0000');

			expect(result.success).toBe(false);
			expect(result.errorType).toBe(ErrorType.TIMEOUT);
		});

		it('should handle 4xx client errors', async () => {
			const clientError = new Error('Client Error');
			(clientError as any).response = { status: 400 };
			mockedAxios.get.mockRejectedValue(clientError);
			mockedAxios.isAxiosError.mockReturnValue(true);

			const result = await fetchColorName('#ff0000');

			expect(result.success).toBe(false);
			expect(result.errorType).toBe(ErrorType.INVALID_COLOR);
		});

		it('should handle 5xx server errors', async () => {
			const serverError = new Error('Server Error');
			(serverError as any).response = { status: 500 };
			mockedAxios.get.mockRejectedValue(serverError);
			mockedAxios.isAxiosError.mockReturnValue(true);

			const result = await fetchColorName('#ff0000');

			expect(result.success).toBe(false);
			expect(result.errorType).toBe(ErrorType.API_ERROR);
			expect(result.error?.status).toBe(500);
		});

		it('should handle non-axios errors', async () => {
			const genericError = new Error('Generic Error');
			mockedAxios.get.mockRejectedValue(genericError);
			mockedAxios.isAxiosError.mockReturnValue(false);

			const result = await fetchColorName('#ff0000');

			expect(result.success).toBe(false);
			expect(result.errorType).toBe(ErrorType.UNKNOWN);
			expect(result.error?.code).toBe('UNKNOWN_ERROR');
		});
	});
});
