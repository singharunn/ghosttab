import js from "@eslint/js";
import ts from "typescript-eslint";

export default [
  js.configs.recommended,
  ...ts.configs.strict,
  ...ts.configs.stylistic,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];
