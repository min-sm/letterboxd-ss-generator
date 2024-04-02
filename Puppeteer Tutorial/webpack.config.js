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
      assert: require.resolve("assert/"),
      zlib: require.resolve("browserify-zlib"),
      constants: require.resolve("constants-browserify"),
      crypto: require.resolve("crypto-browserify"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
      process: require.resolve("process/browser"),
      http: require.resolve("stream-http"),
      url: require.resolve("url"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      vm: require.resolve("vm-browserify"),

      // Add more polyfills as needed for other modules
    },
  },
};
