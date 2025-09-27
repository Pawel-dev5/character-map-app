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
	{ ignores: ['dist'] },
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				project: ['./tsconfig.node.json', './tsconfig.app.json'],
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
		...tseslint.configs.recommendedTypeChecked[0],
		...tseslint.configs.stylisticTypeChecked[0],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.app.json'],
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
);
