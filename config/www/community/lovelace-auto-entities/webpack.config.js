const path = require('path')

module.exports = {
    entry: './src/main.js',
    mode: 'production',
    output: {
        filename: 'auto-entities.js',
        path: path.resolve(__dirname)
    }
}