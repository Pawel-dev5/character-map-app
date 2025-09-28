import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

// Mock providers wrapper
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
	render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Common test utilities
export const mockAxiosSuccess = async (data: any) => {
	const axios = await import('axios');
	(axios.default.get as jest.MockedFunction<typeof axios.default.get>).mockResolvedValueOnce({ data, status: 200 });
};

export const mockAxiosError = async (status: number, message: string) => {
	const axios = await import('axios');
	const error = new Error(message);
	(error as any).response = { status };
	(error as any).isAxiosError = true;
	(axios.default.get as jest.MockedFunction<typeof axios.default.get>).mockRejectedValueOnce(error);
	(axios.isAxiosError as jest.MockedFunction<typeof axios.isAxiosError>).mockReturnValue(true);
};

export const mockLocalStorage = () => {
	const localStorageMock = {
		getItem: jest.fn(),
		setItem: jest.fn(),
		removeItem: jest.fn(),
		clear: jest.fn(),
	};

	Object.defineProperty(window, 'localStorage', {
		value: localStorageMock,
		writable: true,
	});

	return localStorageMock;
};
