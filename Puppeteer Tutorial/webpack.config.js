module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: __dirname + "/dist",
  },
  plugins: [new NodePolyfillPlugin()],
};
