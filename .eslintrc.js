module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
  ],
  ignorePatterns: ["dist", "node_modules"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    project: "tsconfig.eslint.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: ["react", "@typescript-eslint", "@typescript-eslint/eslint-plugin"],
  root: true,
  rules: {
    "arrow-parens": 1,
    camelcase: 1,
    "no-duplicate-imports": 1,
    "no-restricted-syntax": [
      1,
      {
        selector: "ExportDefaultDeclaration",
        message: "Prefer named exports.",
      },
    ],
    "no-tabs": 1,
    "@typescript-eslint/no-extra-semi": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/naming-convention": [
      1,
      {
        format: ["StrictPascalCase"],
        prefix: ["I"],
        selector: "interface",
      },
      {
        format: ["StrictPascalCase"],
        prefix: ["can", "did", "has", "is", "should", "will"],
        selector: "variable",
        types: ["boolean"],
      },
    ],
    // "sort-keys": [
    //   "warn",
    //   "asc",
    //   {
    //     caseSensitive: true,
    //     minKeys: 2,
    //     natural: false,
    //   },
    // ],
    // 'sort-imports': [
    //   'error',
    //   {
    //     allowSeparatedGroups: true,
    //     ignoreCase: false,
    //     ignoreDeclarationSort: false,
    //     ignoreMemberSort: false,
    //     memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
    //   },
    // ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
