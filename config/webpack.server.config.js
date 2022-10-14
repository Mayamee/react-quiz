const webpackNodeExternals = require('webpack-node-externals')
const NodemonWebpackPlugin = require('nodemon-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const mode = process.env.MODE || 'development'
const paths = require('./paths')

module.exports = {
  target: 'node',
  mode,
  entry: `${paths.src.server}/index.js`,
  output: {
    filename: 'bundle.js',
    path: paths.build.server,
  },
  externals: [webpackNodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@build': paths.build.client,
    },
  },
  plugins:
    mode === 'development'
      ? [new NodemonWebpackPlugin(), new CleanWebpackPlugin()]
      : [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
          },
        },
      },
      // we use url-loader as loader for webpack which transforms files into base64 URIs
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      // we use css-loader for handling css files
      {
        test: /\.(sass|scss|css)$/,
        use: ['css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    minimize: mode === 'production',
  },
}
