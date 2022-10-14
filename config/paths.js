const path = require('path')

module.exports = {
  // Source files
  src: {
    root: path.resolve(__dirname, '../src'),
    server: path.resolve(__dirname, '../src/backend-ssr'),
  },
  // Distribution files
  build: {
    client: path.resolve(__dirname, '../build'),
    server: path.resolve(__dirname, '../build/backend'),
  },
}
