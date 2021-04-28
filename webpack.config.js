// entry -> output
const path = require('path');
const CssExtractPlugin = require(`extract-text-webpack-plugin`)

console.log(`here`);
console.log(path.join(__dirname, 'public'));

module.exports = (env) => {
  const isProduction = env === `production`
  const CSSExtract = new CssExtractPlugin(`styles.css`)
  console.log(`env`, env)

  return {
    //entry: './src/hoc.js',
//  entry: './src/playground/redux-expensify.js',
//  entry: './src/playground/typescript-101.tsx',
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
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
        use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap:true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap:true
                }
              }
            ]
          })
      }]
    },
    plugins: [
      CSSExtract
    ],

    devtool: isProduction ? `source-map` : `inline-source-map`, // Allows original source file line numbers in Webpack debugger window
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true, // Ensures index.html is served for all 404's
      port: 1234,
      publicPath: `/dist/`
    }
    //devtool: "cheap-module-eval-source-map"
  }

};
