const path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/App.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        loader: "babel-loader",
        options: {
          presets: [
            ["env", {
              "targets": {
                "browsers": ["last 2 versions"]
              }
            }],
            "react"
          ]
        }
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true
  }
};
