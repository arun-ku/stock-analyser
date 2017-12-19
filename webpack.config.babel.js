import path from 'path';
import webpack from 'webpack';

export default {
  entry: {
    main: './client/index.js',
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux-thunk',
      'axios'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }],
      }
    ]
  },
  resolve: {
    alias: {
      Actions: path.resolve(__dirname, './client/redux/actions/index')
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor'),
  ]
}