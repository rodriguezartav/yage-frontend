const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  cache: true,
  context: path.resolve(__dirname, 'ui'),
  entry: {
   home: ['react-hot-loader/patch','webpack/hot/only-dev-server','webpack-dev-server/client?http://localhost:8080','./apps/home/index.jsx'],
   reservaciones: ['react-hot-loader/patch','webpack/hot/only-dev-server','webpack-dev-server/client?http://localhost:8080','./apps/reservaciones/index.jsx'],
   metaDataTable: ['react-hot-loader/patch','webpack/hot/only-dev-server','webpack-dev-server/client?http://localhost:8080','./apps/metaDataTable/index.jsx'],
   metaDataKanban: ['react-hot-loader/patch','webpack/hot/only-dev-server','webpack-dev-server/client?http://localhost:8080','./apps/metaDataKanban/index.jsx'],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',                          // New
  },
  devServer: {
    contentBase: [path.join(__dirname, "ui")],
    hot: true,
  },
  resolve: {
     extensions: ['.js', '.jsx']
   },
  devtool: "eval",
  module: {
      rules: [
      {
          test: /\.css$/,

          use: [ 'style-loader', 'css-loader' ]
          },
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            options: { cacheDirectory: true },
          }],
        },
        {
          test: /\.jsx$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            options: { cacheDirectory: true }
          }
         ]
        },

        // Loaders for other file types can go here
      ],
    },
    plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("development"),
        API_URL: process.env.MOCK ? JSON.stringify("http://localhost:3001") : JSON.stringify("http://localhost:3000")
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),


    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'ui','template.html'),
      filename: 'index.html',
      chunks: ['home','style'],
      inject: 'body'
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'ui','template.html'),
      filename: 'reservaciones.html',
      chunks: ['reservaciones','style'],
      inject: 'body'
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'ui','template.html'),
      filename: 'metaDataTable.html',
      chunks: ['metaDataTable','style'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'ui','template.html'),
      filename: 'metaDataKanban.html',
      chunks: ['metaDataKanban','style'],
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      { from: 'assets',to: "assets" }
    ])
  ],
};
