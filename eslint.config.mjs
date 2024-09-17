import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import angularEslint from "@angular-eslint/eslint-plugin";
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import alignImport from 'eslint-plugin-align-import'

export default [

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [ "*.ts", "**/*.ts", "**/*.ts", "**/**/*.ts" ],
    plugins:
    {
      'align-import': alignImport,
      '@angular-eslint': angularEslint,
      unicorn: eslintPluginUnicorn
    },
    rules: {
      ...angularEslint.configs.recommended.rules,
      ...eslintPluginUnicorn.configs["flat/recommended"].rules,
      "brace-style": ["error", "allman"],
      "array-bracket-spacing": ["error", "always"],
      "multiline-ternary": ["error", "never"],
      "indent": ["error" , 2, { "SwitchCase": 1 } ],
      "object-curly-spacing": ["error" , "always"],
      "key-spacing": ["error", { "align": "value" }],
      "unicorn/no-null": ["off"],
      "unicorn/prefer-event-target": ["off"],
      "unicorn/switch-case-braces": ["error", "avoid"],
      "@angular-eslint/directive-selector": [
        "error",
        {
          "type": "attribute",
          "prefix": "app",
          "style": "camelCase"
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          "type": "element",
          "prefix": "app",
          "style": "kebab-case"
        }
      ],
      "align-import/align-import": [1],
    }
  },
  {
    languageOptions: { globals: globals.browser }
  },

];
