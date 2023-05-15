const path = require("path");

module.exports = {
    entry: "./src/index.jsx",
    mode: "development",
    output: {
        filename: "./main.js"
      },
      devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: true,
        historyApiFallback: true,
      },

      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.css$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: true
                }
              }
            ]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ["file-loader"]
          }
        ]
    }
}