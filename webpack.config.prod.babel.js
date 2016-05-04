import { join } from 'path';

export default {
  entry: './src/main.js',
  output: {
    path: join(__dirname, 'dist'),
    library: 'reactplottable',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'source-map',
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
