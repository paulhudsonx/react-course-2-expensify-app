// entry -> output
const path = require('path');

console.log(`here`);
console.log(path.join(__dirname, 'public'));

module.exports = {
  //entry: './src/hoc.js',
//  entry: './src/playground/redux-expensify.js',
//  entry: './src/playground/typescript-101.tsx',
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
        },
        {
          loader: 'ts-loader'
        }
        ]
    }, {
      test: /\.s?css$/,  // Make s optional - supports css and scss files
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },

  devtool: "eval-cheap-module-source-map", // Allows original source file line numbers in Webpack debugger window
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    port: 1234
  }
  //devtool: "cheap-module-eval-source-map"
};
