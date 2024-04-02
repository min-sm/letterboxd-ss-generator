// module.exports = {
//   mode: "production",
//   entry: "./src/index.js",
//   output: {
//     filename: "main.js",
//     path: __dirname + "/dist",
//   },
//   plugins: [new NodePolyfillPlugin()],
// };
const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      http: require.resolve("stream-http"),
      url: require.resolve("url"),
      crypto: require.resolve("crypto-browserify"),
      os: require.resolve("os-browserify/browser"),
      https: require.resolve("https-browserify"),
      stream: require.resolve("stream-browserify"),
      zlib: require.resolve("browserify-zlib"),
      util: require.resolve("util/"),

      // Add more polyfills as needed for other modules
    },
  },
};
