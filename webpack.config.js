const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: "production",
  //  入口文件
  entry: {
    vendors: ['jquery', 'bootstrap', "popper.js"],
    index: ['./src/pages/index/index.js'],
    video: ['./src/pages/video/index.js'],
  },
  output: {
    // 公共开头
    publicPath: './',
    //  输出的目录 dist
    path: path.resolve(__dirname, 'dist'),
    //  输出的 JS 文件名
    filename: 'public/js/[name].js',
  },
  plugins: [
    //  配置 ProvidePlugin 插件加载 jQuery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    //  配置 MiniCssExtractPlugin 生成独立的 CSS 文件
    new MiniCssExtractPlugin({
      filename: 'public/css/[name].css',
    }),
    // // 匹配生成不同的html页面
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/index/index.html',
      chunks: ['index', 'vendors',]
    }),
    new HtmlWebpackPlugin({
      filename: 'video.html',
      template: './src/pages/video/index.html',
      chunks: ['video', 'vendors',]
    }),
  ],
  module: {
    rules: [
      // 处理 html文件
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './dist',
            },
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      //  处理 SCSS 文件的 loader
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './dist',
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      // 处理图片
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: 'images/[name].[ext]',
            publicPath: "./"
          }
        }]
      }
    ],
  },
};