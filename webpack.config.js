const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
  const isDev = env.development === true;
  const isProd = env.production === true;
  const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

  return {
    target: isDev ? 'web' : 'browserslist',
    context: __dirname, // to automatically find tsconfig.json
    entry: {
      main: ['@babel/polyfill', './src/index.tsx'],
      analytics: './src/analytics.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: filename('js'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@models': path.resolve(__dirname, 'src/models'),
      },
    },
    optimization: {
      splitChunks: { chunks: 'all' },
      minimize: isProd,
      minimizer: [
        `...`,
        new CssMinimizerPlugin(),
      ],
    },
    // *** WEBPACK-DEV-SERVER ***
    devtool: isDev ? 'source-map' : false,
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      port: 4200,
      open: true,
      hot: true,
    },
    // *** PLUGINS ***
    plugins: [
      new MiniCssExtractPlugin({ filename: filename('css') }),
      new HtmlPlugin({
        title: 'Webpack5',
        favicon: './src/favicon.ico',
        template: './src/index.html',
        minify: { collapseWhitespace: isProd },
      }),
      new ForkTsCheckerWebpackPlugin({ async: false }),
      isDev && new webpack.HotModuleReplacementPlugin(),
      isDev && new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
      isProd && new CleanPlugin(),
    ].filter(Boolean),
    // *** LOADERS ***
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
              ],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            // 'postcss-loader',
            'sass-loader',
          ],
        },
        { test: /\.(png|jpe?g|svg|gif)$/i, use: ['file-loader'] },
        { test: /\.(ttf|woff2?|eot)$/i, use: ['file-loader'] },
        { test: /\.xml$/i, use: ['xml-loader'] },
        { test: /\.csv$/i, use: ['csv-loader'] },
      ],
    },
  };
};
