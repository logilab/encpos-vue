// webpack.config.js

module.exports = {
  publicPath: process.env.SERVER_MODE === "staging" ? "/theses" : "/",
};
