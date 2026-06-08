import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Enforce `import type` for type-only imports
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],

      // Disallow explicit `any`
      '@typescript-eslint/no-explicit-any': 'error',

      // Catch unused variables/imports (ignore vars prefixed with _)
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],

      // Enforce hooks exhaustive-deps (already from reactHooks plugin, but make it error not warn)
      'react-hooks/exhaustive-deps': 'error',

      // No console.log in production code
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Disallow duplicate conditions / unreachable code
      'no-unreachable': 'error',
    },
  },
])
