module.exports = {
  // },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: [1, "double"],
    semi: "error",
    "comma-dangle": ["error", "only-multiline"],
    "no-console": "off",
    "no-param-reassign": "off",
    "no-shadow": "off",
    "object-curly-newline": "off",
    "operator-linebreak": "off",
    "implicit-arrow-linebreak": "off",
    "function-paren-newline": "off",
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "none",
      },
    ],
    "import/no-relative-packages": "error",
    "import/no-import-module-exports": "error",
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    "react/no-unstable-nested-components": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "function-expression",
      },
    ],
    "arrow-body-style": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/prop-types": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-indent": ["error", 2],
  },
};
