const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pkg = require("./package.json");
const commonPaths = require("./build-utils/config/commonPaths.js");

const isDebug = !process.argv.includes("release");
const port = process.env.PORT || 3000;

module.exports = {
  entry: commonPaths.entryPath,
  output: {
    uniqueName: pkg.name,
    publicPath: "/",
    path: commonPaths.outputPath,
    filename: `${pkg.version}/js/[name].[chunkhash:8].js`,
    chunkFilename: `${pkg.version}/js/[name].[chunkhash:8].js`,
    assetModuleFilename: isDebug ? `assets/[path][name].[contenthash:8][ext]` : `assets/[name].[contenthash:8][ext]`,
    crossOriginLoading: "anonymous",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
    }),
  ],
  devServer: {
    port,
    static: {
      directory: commonPaths.outputPath,
    },
    historyApiFallback: {
      index: "index.html",
    },
    webSocketServer: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        // Important: css-loader first (resolves url()), then to-string-loader
        test: /\.css$/i,
        use: [
          {
            loader: "to-string-loader",
          },
          {
            loader: "css-loader",
            options: { url: true },
          },
        ],
      },
      {
        // Inline modern webfonts into CSS (no network requests)
        test: /\.(woff|woff2)$/i,
        type: "asset/inline",
      },
      {
        // Other assets (images, etc.)
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name].[hash][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
};
