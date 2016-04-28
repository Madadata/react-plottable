module.exports = {
  entry: './src/helloworld.js',
  output: {
    path: './build',
    filename: 'bundle.js',
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
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}
