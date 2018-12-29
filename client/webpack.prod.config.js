const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
		publicPath: '/'
  },
  devtool: 'source-map',
  mode: 'production',
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
    new UglifyJSPlugin({ sourceMap: true }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
		new MiniCssExtractPlugin({ filename: 'style.css' })
  ]
};
