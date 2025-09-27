import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // =========================
      // --> Turn the rule off <--
      // =========================
      "react/react-in-jsx-scope": 0,
      // React 17+ provide support for a new version of the JSX transform
      "react/require-default-props": 0,
      // DefaultProps => object default values
      "import/prefer-default-export": 0,
      "react/jsx-no-useless-fragment": 0,
      "no-param-reassign": 0,
      // Redux toolkit - linting state mutations
      "import/no-relative-packages": 0,
      // Off error on import from _components
      "react/prop-types": 0,
      // Off props types
      "react/forbid-prop-types": [
        1,
        {
          forbid: [],
        },
      ],
      // Reset default forbid props as any, array, object
      "import/no-named-as-default": 0,
      // Allow to use default import
      "import/no-named-as-default-member": 0,
      // Allow to use default import
      "no-plusplus": 0,
      // Allow to use i++ operator
      // =====================================
      // --> Turn the rule on as a warning <--
      // =====================================
      "react/jsx-filename-extension": [
        1,
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      // ====================================
      // --> Turn the rule on as an error <--
      // ====================================
      "react/function-component-definition": [
        2,
        {
          namedComponents: "arrow-function",
        },
      ],
      // This rule is aimed to enforce consistent function types for function components.
      "prettier/prettier": [
        2,
        {
          endOfLine: "auto",
        },
      ],
      "react/no-unstable-nested-components": [
        2,
        {
          allowAsProps: true,
        },
      ],
      "react/jsx-props-no-spreading": [
        2,
        {
          html: "ignore",
          custom: "ignore",
          explicitSpread: "ignore",
          exceptions: [""],
        },
      ],
      "import/no-extraneous-dependencies": "off",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],
    },
  },
]);
