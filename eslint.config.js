import config from "@ethang/eslint-config/eslint.config.js";
import tseslint from "typescript-eslint";

export default tseslint.config(...config, {
  ignores: ["dist/"], // Your ignores directories
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    "n/no-extraneous-import": "off",
    "react/forbid-component-props": "off",
    "react/no-unknown-property": "off",
    "react/jsx-max-depth": "off",
    "max-lines-per-function": "off",
    "import/no-unresolved": "off",
  },
});
