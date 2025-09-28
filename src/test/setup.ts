import '@testing-library/jest-dom';

jest.mock('leaflet', () => ({
	map: jest.fn(() => ({
		setView: jest.fn(),
		addLayer: jest.fn(),
		removeLayer: jest.fn(),
		on: jest.fn(),
		off: jest.fn(),
		getZoom: jest.fn(() => 13),
		getCenter: jest.fn(() => ({ lat: 52.2297, lng: 21.0122 })),
		invalidateSize: jest.fn(),
	})),
	tileLayer: jest.fn(() => ({
		addTo: jest.fn(),
	})),
	Icon: {
		Default: {
			mergeOptions: jest.fn(),
		},
	},
}));

jest.mock('../i18n', () => ({
	__esModule: true,
	default: {
		t: jest.fn((key: string, options?: any) => {
			if (options && typeof options === 'object') {
				return key.replace(/\{\{(\w+)\}\}/g, (match, prop) => options[prop] || match);
			}
			return key;
		}),
		changeLanguage: jest.fn(),
		language: 'en',
		languages: ['en', 'pl'],
	},
}));

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: jest.fn((key: string, options?: any) => {
			if (options && typeof options === 'object') {
				return key.replace(/\{\{(\w+)\}\}/g, (match, prop) => options[prop] || match);
			}
			return key;
		}),
		i18n: {
			changeLanguage: jest.fn(),
			language: 'en',
			languages: ['en', 'pl'],
		},
	}),
}));

jest.mock('axios', () => ({
	__esModule: true,
	default: {
		get: jest.fn(),
		isAxiosError: jest.fn(),
	},
	isAxiosError: jest.fn(),
}));

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

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

globalThis.console = {
	...console,
	warn: jest.fn(),
	error: jest.fn(),
};
