var path = require('path');
const webpack = require('webpack');
const publicPath = '/dist/build/';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  //Content 
  entry: './src/index.js',
  // A SourceMap without column-mappings ignoring loaded Source Maps. 
  devtool: 'cheap-module-source-map',
  plugins: [
    //simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you, supply your own template using lodash templates or use your own loader.
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement'
    }),
    //Auto replacement of page when i save some file, even css
    new webpack.HotModuleReplacementPlugin(),
    new MonacoWebpackPlugin()
  ],

  output: {
    path: path.join(__dirname, publicPath),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map',
  },

  devServer: {
    port: 3000,
    host: 'localhost',
    //Be possible go back pressing the "back" button at chrome
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: publicPath,
    contentBase: path.join(__dirname, publicPath),
    //hotmodulereplacementeplugin
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: { presets: ["es2015"] }
        }
      }]
  },
}
