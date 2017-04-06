const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base');

module.exports = () => {
  return webpackMerge(baseConfig(), {
    plugins: [
      new webpack.DefinePlugin({
        API_URL: JSON.stringify('http://localhost:5000'),
      }),
    ],
  });
};
