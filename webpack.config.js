/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  devServer: {
    historyApiFallback: true,
    port: 3000,
    proxy: {
      "/graphql": {
        target: "http://localhost:3080/graphql",
      },
      // "/encrypted_data/*": {
      //   target: "http://127.0.0.1:8180/",
      //   rewrite: function (req) {
      //     req.url = "http://127.0.0.1:8180/" + req.url
      //   },
      // },
      // "/media/*": {
      //   target: "http://127.0.0.1:8585",
      //   rewrite: function (req) {
      //     req.url = "http://127.0.0.1:8585" + req.url
      //   },
      // },
    },
  },
  devtool: "source-map",
  entry: "./src/index.tsx",
  mode: process.env.MODE,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts(x?)$/,
        use: ["babel-loader"],
      },
      {
        test: /\.ttf/,
        type: "asset/resource",
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    sourceMapFilename: "[name].js.map",
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({ filename: "[file].map[query]" }),
    new webpack.EnvironmentPlugin({ MODE: process.env.MODE }),
    new HTMLWebpackPlugin({ template: "public/index.html" }),
  ],
  resolve: {
    alias: {
      "#api": path.resolve(process.cwd(), "src/api"),
      "#components": path.resolve(process.cwd(), "src/components"),
      "#models": path.resolve(process.cwd(), "src/models"),
      "#src": path.resolve(process.cwd(), "src"),
      "#styles": path.resolve(process.cwd(), "src/styles"),
      "#utils": path.resolve(process.cwd(), "src/utils"),
      "#views": path.resolve(process.cwd(), "src/views"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
}
