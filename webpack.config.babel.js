import path from 'path';

export default {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
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
  }
}