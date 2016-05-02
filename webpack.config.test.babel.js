import { join } from 'path';

export default {
  entry: './test/tests.js',
  output: {
    path: join(__dirname, 'test'),
    filename: 'react-plottable.spec.js'
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
