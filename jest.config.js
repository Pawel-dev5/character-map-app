export default {
	// Test environment
	testEnvironment: 'jsdom',

	// Setup files
	setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],

	// Module name mapping for imports
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/src/test/__mocks__/fileMock.js',
	},

	// Transform files
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: {
					jsx: 'react-jsx',
				},
			},
		],
		'^.+\\.svg$': '<rootDir>/src/test/__mocks__/svgTransform.js',
	},

	// File extensions to consider
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

	// Test match patterns
	testMatch: ['<rootDir>/src/**/__tests__/**/*.(ts|tsx|js)', '<rootDir>/src/**/?(*.)(test|spec).(ts|tsx|js)'],

	// Coverage settings
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!src/**/*.d.ts',
		'!src/test/**',
		'!src/main.tsx',
		'!src/vite-env.d.ts',
		'!src/**/index.ts',
	],

	// Coverage thresholds
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70,
		},
	},

	// TypeScript configuration
	preset: 'ts-jest/presets/default-esm',
	extensionsToTreatAsEsm: ['.ts', '.tsx'],

	// Clear mocks between tests
	clearMocks: true,

	// Restore mocks after each test
	restoreMocks: true,
};
