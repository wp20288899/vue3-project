import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import configPrettier from 'eslint-config-prettier'

export default defineConfigWithVueTs(
  js.configs.recommended,
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  configPrettier,
  {
    files: ['src/**/*.{ts,vue}'],
    rules: {
      // TypeScript
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      // Vue
      'vue/multi-word-component-names': 'off',
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/define-macros-order': [
        'error',
        { order: ['defineProps', 'defineEmits', 'defineSlots', 'defineExpose'] },
      ],
      'vue/no-v-html': 'warn',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
)
