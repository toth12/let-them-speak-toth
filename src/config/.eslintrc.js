module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jest": true
  },
  "globals": {
    "process": {
      "env": "development"
    }
  },
  "extends": [
    "eslint:recommended",
  ],
  "rules": {
    "import/extensions": ["error", "always", {
      "js": "never",
      "jsx": "never",
      "mjs": "never"
    }],
    "import/extensions": 0,
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "linebreak-style": ["error", "unix"],
    "max-len": [1, 80, { "ignoreComments": true, "ignoreTrailingComments": true, "ignoreUrls": true }],
    "no-console": ["error", { allow: ["warn"] }],
    "no-empty": ["error", { "allowEmptyCatch": true }],
    "no-undef": ["error", { "typeof": false }],
    "no-unused-vars": ["error", { "varsIgnorePattern": "React" }],
    "no-case-declarations": 0,
    "no-trailing-spaces": 2,
    "quotes": ["error", "single"],
    "react/jsx-uses-vars": 2,
  },
  "plugins": [
    "react",
    "import",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    }
  }
};
