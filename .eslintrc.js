module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react-native', 'react-hooks', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-native/no-inline-styles': 'error',
        'react-native/no-unused-styles': 'error',
        'react-native/no-single-element-style-arrays': 2,
        'react/no-unescaped-entities': 'off',
        'react-hooks/exhaustive-deps': 'warn',
        'sort-imports': [
          'error',
          {ignoreCase: true, ignoreDeclarationSort: true},
        ],
        'import/order': [
          'error',
          {
            groups: [
              ['external', 'builtin'],
              'internal',
              ['sibling', 'parent'],
              'index',
            ],
            pathGroups: [
              {
                pattern: '@(react|react-native)',
                group: 'external',
                position: 'before',
              },
              {
                pattern: '@/**',
                group: 'internal',
              },
              {
                pattern: './**',
                group: 'index',
              },
            ],
            pathGroupsExcludedImportTypes: ['internal', 'react'],
            'newlines-between': 'never',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
  ],
};
