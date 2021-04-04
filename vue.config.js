module.exports = {
  lintOnSave: false,
  devServer: {
    https: true,
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'WebRTC',
    }
  }
}
