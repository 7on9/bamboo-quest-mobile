module.exports = {
  "env": {
      "es6": true,
      "node": true
  },
  "plugins": ["prettier", "react"],
  "extends": [
      "eslint:recommended",
      "prettier",
      "prettier/react",
      "plugin:react/recommended",
      "plugin:import/errors",
      "plugin:import/warnings"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaVersion": 2017,
      "sourceType": "module",
      "ecmaFeatures": {
          "modules": true
      }
  },
  "rules": {
      "max-len": ["off", 100, 4],
      "jsx-max-len/jsx-max-len": ["off", { "lineMaxLength": 100, "tabWidth": 4, "maxAttributesPerLine": 10 }],
      "prettier/prettier": [
          "error",
          {
              "semi": false,
              "singleQuote": true,
              "tabWidth": 4,
              "printWidth": 100,
              "trailingComma": "es5",
              "space-in-brackets": "always",
          }
      ],
      "react/forbid-prop-types": ["off"],
      "react/prop-types": ["warn"],
      "react/jsx-no-bind": ["off"],
      "react/jsx-indent": ["off"],
      "react/jsx-indent-props": ["off"],
      "react/jsx-filename-extension": ["off"],
      "import/no-named-as-default": ["off"],
      "no-unused-vars": [
          "error",
          {
              "ignoreRestSiblings": true
          }
      ]
  },
  "overrides": [
      {
          "files": ["**/*.spec.js"],
          "rules": {
              "semi": "off",
              "react/jsx-no-bind": ["off"],
              "react/prop-types": ["off"]
          }
      }
  ]
}