/* eslint-disable quote-props */
import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      ecmaVersion: 2021,
      sourceType: 'module'
    },
    rules: {
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      'no-var': 'error',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'comma-dangle': ['error', 'only-multiline'],
      'eol-last': ['error', 'always'],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'space-before-blocks': 'error',
      'space-before-function-paren': ['error', 'never'],
      'space-in-parens': ['error', 'never'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'array-bracket-spacing': ['error', 'never'],
      'block-spacing': ['error', 'always'],
      'camelcase': ['error', { properties: 'always' }],
      'comma-spacing': ['error', { before: false, after: true }],
      'comma-style': ['error', 'last'],
      'computed-property-spacing': ['error', 'never'],
      'func-call-spacing': ['error', 'never'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'object-curly-spacing': ['error', 'always'],
      'padded-blocks': ['error', { blocks: 'never', classes: 'never', switches: 'never' }],
      'quote-props': ['error', 'as-needed'],
      'space-infix-ops': 'error',
      'spaced-comment': ['error', 'always', { exceptions: ['-'] }]
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    }
  },
  pluginJs.configs.recommended
];
