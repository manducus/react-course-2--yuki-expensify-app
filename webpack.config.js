const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const isProduction = env === "production"

    return {
        mode: isProduction ? 'production' : 'development',
        entry: ["./src/app.js"],
        output: {
            path: path.resolve(__dirname, "public", "dist"),
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
                    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    // style-loader handles the inlining of the styles
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
                // whenever webpack encounters a .scss file,
                // first: it gets the .scss code
                // second: convert .scss into .css
                // finally; get it showing up in the browser by dumping it into a style tag
            }]
        },
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            // tells devServer that we're going to be handling routing via client side code,
            // and that it should return index.html for all 404 routes
            publicPath: "/dist/"
            // The bundled files will be available in the browser under this path.
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "styles.css"
            })
        ],
        devtool: isProduction ? "source-map" : "inline-source-map"
    }
}

// node-sass takes our Sass or SCSS code & converts it into regular CSS
// sass-loader enables loading SCSS

// react-router --> web-app, native app
// react-router-dom --> web-app
// react-router-native --> native app