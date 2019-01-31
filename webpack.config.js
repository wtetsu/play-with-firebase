const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    index: "./src/index.jsx"
  },
  output: {
    path: __dirname + "/public"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.jsx$/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/env", "@babel/react"] }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [new CopyWebpackPlugin([{ from: "static", to: "." }])],
  devtool: isProd ? false : "cheap-module-source-map",
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 3000000
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          warnings: false
        }
      })
    ]
  }
};
