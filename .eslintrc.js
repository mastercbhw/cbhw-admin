const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  rules: {
    ...strictEslint.rules,
    "max-len": [0, 120, 4],
    "react/no-array-index-key": "off",
    "no-underscore-dangle": "off"
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
