const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
		publicPath: '/'
  },
  devtool: 'eval',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
		// had to swap hot option for inline one to reload on style changes too,
		// HMR only reload the changed component, @see https://stackoverflow.com/a/43965729/5524590
    // hot: true,
		inline: true,
    open: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:5000/',
        secure: false
      }
    },
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: [
          'file-loader',
          'image-webpack-loader'
        ]
      },
			{
				test: /\.scss$/,
				loader: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			}
    ]
  },
  plugins: [
  	// HMR is disabled see devServer section comment
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
		new MiniCssExtractPlugin({ filename: 'style.css' })
  ]
};
