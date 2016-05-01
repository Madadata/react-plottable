import { join } from 'path';

export default {
  entry: './src/main.js',
  ouput: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'react-plottable'
  },
  devtool: 'source-map',
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
