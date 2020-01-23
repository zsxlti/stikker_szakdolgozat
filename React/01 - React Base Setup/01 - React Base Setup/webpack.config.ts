import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const SERVER_PORT = process.env.SERVER_PORT || 7777;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  performance:
  {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  entry: [
    'webpack/hot/dev-server',
    `webpack-dev-server/client?http://${SERVER_HOSTNAME}:${SERVER_PORT}`,
    path.join(__dirname, 'src', 'index.tsx'),
    'react-hot-loader/patch'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].js',
    chunkFilename: 'assets/[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin
    ({
      template: './index.html',
      minify:
      {
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin
    ({
      filename: 'assets/[name].[contenthash].css'
    }),
    new InlineManifestWebpackPlugin(),
  ],
  optimization:
  {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups:
      {
        utilities:
        {
          test: /[\\/]node_modules[\\/](immutable|moment|react|react-dom|react-loading)[\\/]/,
          name: 'utilities',
        },
      },
    },
  },
  resolve:
  {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.json'],
    modules:
    [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
  },
  node:
  {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module:
  {
    rules:
    [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
      },
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, 'src'),
        use: [{
          loader: 'awesome-typescript-loader',
          options: {
            silent: true,
          },
        }],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        include: path.join(__dirname, 'src'),
        enforce: 'pre'
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        include: path.join(__dirname, '../'),
        use: [{
          loader: 'url-loader',
          options:
          {
            limit: 10240,
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
};

export default config;
