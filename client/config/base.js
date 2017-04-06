const path = require('path');
const webpack = require('webpack');

module.exports = () => {
  return {
    entry: {
      main: path.join(__dirname, '../src/js/index.js'),
    },
    output: {
      path: path.join(__dirname, '../../docs'),
      filename: 'js/[name].js'
    },
    devServer: {
      contentBase: path.join(__dirname, '../../docs'),
      watchContentBase: true,
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
    ]
  };
};
