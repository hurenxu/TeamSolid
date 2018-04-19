const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  // entry: {
  //   app: [
  //     'webpack-hot-middleware/client',
  //     'react-hot-loader/patch',
  //     './client/index.js',
  //   ],
  //   vendor: [
  //     'react',
  //     'react-dom',
  //   ],
  // },
  output: {
    path: path.join(__dirname, 'client'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor',
  //     minChunks: Infinity,
  //     filename: 'vendor.js',
  //   }),
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       CLIENT: JSON.stringify(true),
  //       'NODE_ENV': JSON.stringify('development'),
  //     }
  //   }),
  // ],
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
  }
}
