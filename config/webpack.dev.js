const webpack = require("webpack");
const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: require.resolve("./tsconfig.json")
            }
          }
        ]
      }
    ]
  },

  entry: {
    app: [
      path.join(__dirname, "../src/client/polyfill.ts"),
      path.join(__dirname, "../src/client/index.tsx")
    ]
    // vendors: [
    //   path.join(__dirname, "../src/client/polyfill.tsx"),
    //   "styled-components",
    //   "react",
    //   "react-dom",
    //   "react-router-dom"
    // ]
  },

  output: {
    filename: "[name].dev.js",
    path: path.resolve(__dirname, "../public/dist"),
    publicPath: "/dist/"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  mode: "development",

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      },

      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        IS_BROWSER: JSON.stringify("true")
      }
    })
  ]
};
