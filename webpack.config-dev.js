const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const npmPackage = require("./package.json");

module.exports = {
  cache: true,
  context: path.resolve(__dirname, 'ui'),
  entry: {
    home: ['react-hot-loader/patch', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:8080', './apps/home/index.jsx'],
    reservaciones: ['react-hot-loader/patch', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:8080', './apps/reservaciones/index.jsx'],
    table: ['react-hot-loader/patch', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:8080', './apps/table/index.jsx'],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // New
  },
  devServer: {
    contentBase: [path.join(__dirname, "ui")],
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react': path.resolve(__dirname, 'node_modules', 'react'),
      'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
    }
  },
  devtool: "eval",
  module: {
    rules: [{
        test: /\.css$/,
        exclude: excludeNodeModulesExcept(["@rodco/ion81", "draft-js", "react-draft-wysiwyg"]),
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.js$/,
        exclude: excludeNodeModulesExcept(["@rodco/ion81"]),
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          },
        }],
      }, {
        test: /\.jsx$/,
        exclude: excludeNodeModulesExcept(["@rodco/ion81"]),
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }]
      },

      // Loaders for other file types can go here
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("development"),
        API_URL: process.env.MOCK ? JSON.stringify("http://localhost:3001") : JSON.stringify("http://localhost:3000"),
        DOMAIN: JSON.stringify("ceremoniacusingas.org"),
        VERSION: JSON.stringify("1.0")
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),


    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'ui', 'template.html'),
      filename: 'index.html',
      chunks: ['home', 'style'],
      inject: 'body'
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'ui', 'template.html'),
      filename: 'reservaciones.html',
      chunks: ['reservaciones', 'style'],
      inject: 'body'
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'ui', 'template.html'),
      filename: 'table.html',
      chunks: ['table', 'style'],
      inject: 'body'
    }),
    new CopyWebpackPlugin([{
      from: '../ion/assets',
      to: "assets"
    }]),
    new CopyWebpackPlugin([{
      from: 'public',
      to: "public"
    }])
  ],
};

function excludeNodeModulesExcept(modules) {
  var pathSep = path.sep;
  if (pathSep == '\\') // must be quoted for use in a regexp:
    pathSep = '\\\\';
  var moduleRegExps = modules.map(function(modName) {
    return new RegExp("node_modules" + pathSep + modName)
  })

  return function(modulePath) {
    if (/node_modules/.test(modulePath)) {
      for (var i = 0; i < moduleRegExps.length; i++)
        if (moduleRegExps[i].test(modulePath)) return false;
      return true;
    }
    return false;
  };
}
