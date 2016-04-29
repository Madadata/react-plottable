module.exports = [
  {
    entry: './src/main.js',
    output: {
      path: './build',
      filename: 'react-plottable.js',
    },
    devServer: {
      inline: true,
      contentBase: './build',
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
  },
  {
  entry: './test/tests.js',
    output: {
      path: './test',
      filename: 'react-plottable.spec.js',
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
  }
]
