// webpack.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/theses',
  configureWebpack: config => {
    config.resolve.fallback = { url: false }
  }
}
