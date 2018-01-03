const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './ui'),
  entry: {
    home: './apps/home/index.jsx',
    app: './apps/app/index.jsx',
    reservaciones: './apps/reservaciones/index.jsx'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',                          // New
  },


  resolve: {
     extensions: ['.js', '.jsx'],
      alias: {
       'react': path.resolve(__dirname, 'node_modules', 'react'),
       'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
     }
   },
  devtool: 'source-map',
  module: {
    rules: [
    {
        test: /\.css$/,
        exclude: excludeNodeModulesExcept(["ion81"]),
        loader:  ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1',
        }),
      },
      {
        test: /\.js$/,
        exclude: excludeNodeModulesExcept(["ion81"]),
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
      },
      {
        test: /\.jsx$/,
        exclude: excludeNodeModulesExcept(["ion81"]),
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015','react'] },
        }],
      },

    ],
  },
    plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: process.env.NODE_ENV == "staging" ? JSON.stringify("https://apistaging.ceremoniacusingas.org") : JSON.stringify("https://api.ceremoniacusingas.org")
      }
    }),
    new CleanWebpackPlugin(["dist/*.js","dist/*.css","dist/*.html","dist/*.map","dist/*.gz"], {verbose: true}),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
       sourceMap: true,
       comments: false
     }),
      new ExtractTextPlugin({
        filename: '[name].[hash].css',
        allChunks: true,
      }),



    new HtmlWebpackPlugin({
      template: './template.html',
      filename: 'index.html',
      chunks: ['home','style'],
      inject: 'body'
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'ui','template.html'),
      filename: 'app.html',
      chunks: ['app','style'],
      inject: 'body'
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'ui','template.html'),
      filename: 'reservaciones.html',
      chunks: ['reservaciones','style'],
      inject: 'body'
    }),

   new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html|css)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
   new CopyWebpackPlugin([
     { from: '../node_modules/ion81/assets',to: "assets" }
   ]),
   new CopyWebpackPlugin([
    { from: 'public',to: "public" }
  ])
  ],
};

function excludeNodeModulesExcept (modules)
{
    var pathSep = path.sep;
    if (pathSep == '\\') // must be quoted for use in a regexp:
        pathSep = '\\\\';
    var moduleRegExps = modules.map (function (modName) { return new RegExp("node_modules" + pathSep + modName)})

    return function (modulePath) {
      console.log(modulePath)
        if (/node_modules/.test(modulePath)) {
            for (var i = 0; i < moduleRegExps.length; i ++)
                if (moduleRegExps[i].test(modulePath)) return false;
            return true;
        }
        return false;
    };
}
