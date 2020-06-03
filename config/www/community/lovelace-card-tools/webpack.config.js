const path = require('path');

module.exports = {
  entry: './src/main.js',
  mode: 'production',
  output: {
    filename: 'card-tools.js',
    path: path.resolve(__dirname)
  }
};
