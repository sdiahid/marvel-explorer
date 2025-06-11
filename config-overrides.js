const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    ['@comps']: path.resolve(__dirname, 'src/components'),
    ['@hooks']: path.resolve(__dirname, 'src/hooks'),
    ['@api']: path.resolve(__dirname, 'src/api'),
  })
);