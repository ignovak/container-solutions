module.exports = {
  entry:['./master-node.js', './main.js'],
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css/, loader: 'style!css!sass' },
    ]
  },
  watch: true
}
