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
    port: 3002
  },
  module: {
    loaders: [
      {
        text: /\.js$/,
        exclude: /(node_modules|bower_components)\//,
        loader: 'babel'
      }
    ]
  }
};
