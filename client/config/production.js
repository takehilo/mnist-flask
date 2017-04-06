const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./base');

module.exports = () => {
  return webpackMerge(baseConfig(), {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        API_URL: JSON.stringify('https://mnist-flask.herokuapp.com'),
      }),
    ],
  });
};
