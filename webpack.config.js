// entry -> output
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require(`extract-text-webpack-plugin`);

console.log(`here`);
console.log(path.join(__dirname, "public"));

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "test") {
  require("dotenv").config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.development" });
}

module.exports = (env) => {
  const isProduction = env === `production`;
  const CSSExtract = new ExtractTextPlugin(`styles.css`);
  console.log(`env`, env);

  return {
    //entry: './src/hoc.js',
    //  entry: './src/playground/redux-expensify.js',
    //  entry: './src/playground/typescript-101.tsx',
    entry: "./src/app.js",
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
            {
              loader: "ts-loader",
            },
          ],
        },
        {
          test: /\.s?css$/, // Make s optional - supports css and scss files
          use: CSSExtract.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true,
                },
              },
            ],
          }),
        },
      ],
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        "process.env.FIREBASE_API_KEY": JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(
          process.env.FIREBASE_AUTH_DOMAIN
        ),
        "process.env.FIREBASE_DATABASE_URL": JSON.stringify(
          process.env.FIREBASE_DATABASE_URL
        ),
        "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
          process.env.FIREBASE_PROJECT_ID
        ),
        "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(
          process.env.FIREBASE_STORAGE_BUCKET
        ),
        "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
          process.env.FIREBASE_MESSAGING_SENDER_ID
        ),
        "process.env.APP_ID": JSON.stringify(process.env.APP_ID),
        "process.env.MEASUREMENT_ID": JSON.stringify(
          process.env.MEASUREMENT_ID
        ),
      }),
    ],

    devtool: isProduction ? `source-map` : `inline-source-map`, // Allows original source file line numbers in Webpack debugger window
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true, // Ensures index.html is served for all 404's
      //port: 1234,
      publicPath: `/dist/`,
    },
    //devtool: "cheap-module-eval-source-map"
  };
};
