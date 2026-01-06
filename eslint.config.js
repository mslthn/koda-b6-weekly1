import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
  {
    rules: {
      semi: ["error", "always"],
      curly: ["error", "all"],
      quotes : ["error", "double"],
      "no-var": "error",
      indent: ["error", 2],
      "no-unused-vars": ["warn"],
      "eqeqeq": "error"
    }
  }
]);
