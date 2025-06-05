// @ts-check

// const globals = require("globals"); // Cannot load due to install issues
// const pluginJs = require("@eslint/js"); // Cannot load
// const pluginPrettier = require("eslint-plugin-prettier/recommended"); // Cannot load

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: { // Manually define common Node globals if 'globals' package isn't available
        'require': 'readonly',
        'module': 'readonly',
        'exports': 'writable',
        '__dirname': 'readonly',
        '__filename': 'readonly',
        'process': 'readonly',
        'console': 'readonly'
        // Add other globals if needed, e.g. Buffer, setTimeout, etc.
      }
    },
    rules: {
      // Add some very basic, common rules that don't depend on plugins
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'no-console': 'off', // As per original config
      'func-names': 'off', // As per original config
      'no-underscore-dangle': 'off', // As per original config
      'consistent-return': 'off', // As per original config
      'semi': ['error', 'always'], // Example: enforce semicolons
      'quotes': ['error', 'single'] // Example: enforce single quotes
      // Cannot include "prettier/prettier": "error" as eslint-plugin-prettier cannot be loaded.
    }
  }
  // pluginJs.configs.recommended, // Cannot use
  // pluginPrettier, // Cannot use
];
