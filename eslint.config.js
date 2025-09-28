import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';
import prettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist', 'src/test/__mocks__/**/*.js', '*.config.js'] },
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['src/**/*.{ts,tsx}'],
		ignores: ['src/**/__tests__/**/*', 'src/**/*.test.*', 'src/**/*.spec.*', 'src/test/**/*'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				project: ['./tsconfig.app.json'],
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			react: react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'react-x': reactX,
			'react-dom': reactDom,
			prettier: prettier,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			...reactRefresh.configs.vite.rules,
			...reactX.configs['recommended-typescript'].rules,
			...reactDom.configs.recommended.rules,
			// Put rules you want to override here
			'react-dom/no-dangerously-set-innerhtml': 'warn',
			// Custom rule overrides
			// =========================
			// --> Turn the rule off <--
			// =========================
			'react/react-in-jsx-scope': 0,
			// React 17+ provide support for a new version of the JSX transform
			'react/require-default-props': 0,
			// DefaultProps => object default values
			'react/jsx-no-useless-fragment': 0,
			'no-param-reassign': 0,
			// Redux toolkit - linting state mutations
			'react/prop-types': 0,
			// Allow to use default import
			'no-plusplus': 0,
			// Allow to use i++ operator
			// =====================================
			// --> Turn the rule on as a warning <--
			// =====================================
			'react/jsx-filename-extension': [
				1,
				{
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			],
			// ====================================
			// --> Turn the rule on as an error <--
			// ====================================
			'react/function-component-definition': [
				2,
				{
					namedComponents: 'arrow-function',
				},
			],
			// This rule is aimed to enforce consistent function types for function components.
			'prettier/prettier': [
				2,
				{
					endOfLine: 'auto',
				},
			],
			'react/no-unstable-nested-components': [
				2,
				{
					allowAsProps: true,
				},
			],
			'react/jsx-props-no-spreading': [
				2,
				{
					html: 'ignore',
					custom: 'ignore',
					explicitSpread: 'ignore',
					exceptions: [''],
				},
			],
		},
	},
	// TypeScript files with type checking
	{
		files: ['src/**/*.{ts,tsx}'],
		ignores: ['src/**/__tests__/**/*', 'src/**/*.test.*', 'src/**/*.spec.*', 'src/test/**/*'],
		...tseslint.configs.recommendedTypeChecked[0],
		...tseslint.configs.stylisticTypeChecked[0],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.app.json'],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	// Jest test files
	{
		files: ['src/**/__tests__/**/*', 'src/**/*.test.*', 'src/**/*.spec.*', 'src/test/**/*'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.browser,
				...globals.jest,
			},
			parserOptions: {
				project: ['./tsconfig.test.json'],
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			react: react,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			...react.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
			// Relax rules for test files
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
		},
	},
	// Cypress test files
	{
		files: ['cypress/**/*', 'cypress.config.ts'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				project: ['./tsconfig.cypress.json'],
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			// Cypress specific rules
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-namespace': 'off',
		},
	},
	// Node.js config files
	{
		files: ['vite.config.ts'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.node,
			parserOptions: {
				project: ['./tsconfig.node.json'],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
);
