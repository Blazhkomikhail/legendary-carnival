const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    hot: true,
    port: 8080,
    contentBase: path.join(__dirname, 'dist')
  }
};

const esLintPlugin = (isDev) => isDev ? [] : [new ESLintPlugin({ extensions: ["ts", "tsx", "js"] })];

module.exports = ({develop}) => ({
  mode: develop ? 'development' : 'production', 
  devtool: develop ? 'inline-source-map' : false,
  entry: {
    app: './src/Client.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]',
    clean: true
  },
  experiments: {
    asset: true,
   },
   module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      App: path.resolve(__dirname, 'src/App/'),
      Pages: path.resolve(__dirname, 'src/Pages/'),
  },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/Html/Browser.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: "./public/"}
      ],
    }),
    ...esLintPlugin(develop),
  ],
  ...devServer(develop),
});