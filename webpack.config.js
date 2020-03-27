const path = require("path")

module.exports = {
    entry: ["./src/app.js"],
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },{
            test: /\.s?css$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
            // whenever webpack encounters a .scss file,
            // first: it gets the .scss code
            // second: convert .scss into .css
            // finally; get it showing up in the browser by dumping it into a style tag
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        historyApiFallback: true
        // tells devServer that we're going to be handling routing via client side code,
        // and that it should return index.html for all 404 routes
    },
    devtool: "cheap-module-eval-source-map"
}

// node-sass takes our Sass or SCSS code & converts it into regular CSS
// sass-loader enables loading SCSS

// react-router --> web-app, native app
// react-router-dom --> web-app
// react-router-native --> native app