import { join } from 'path';

export default {
  entry: './src/main.js',
  output: {
    path: join(__dirname, 'dist'),
    filename: 'react-plottable.js'
  },
  devServer: {
    inline: true,
    contentBase: './dist',
    port: 3000
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)\//,
        loader: 'babel'
      }
    ]
  }
};
