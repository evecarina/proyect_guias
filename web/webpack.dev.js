const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: {
        piscinas: [ 'babel-polyfill', './src/index.js' ],
        terrazas: [ 'babel-polyfill', './src/index.js' ]
    },     
    
    devServer: {
        open: 'chrome',
        openPage: 'piscinas',
        port: 8080,
        contentBase: path.join(__dirname, "dist")
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        // creates style nodes from JS strings
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                    // Please note we are not running postcss here
                ]
            }
            ,
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: '[path][name].[ext]?hash=[hash:20]',
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
    

        new HtmlWebpackPlugin({
            template: './src/pages/global.html',
            // Inject the js bundle at the end of the body of the given template
            //inject: 'body',
            inject: true,
            chunks : ['global'],
            filename : './global/index.html'
         }),

        new HtmlWebpackPlugin({
            template: './src/pages/piscinas.html',
            // Inject the js bundle at the end of the body of the given template
            //inject: 'body',
            inject: true,
            chunks : ['piscinas'],
            filename : './piscinas/index.html'
         }),
         new HtmlWebpackPlugin({
            template: './src/pages/terrazas.html',
            // Inject the js bundle at the end of the body of the given template
            //inject: 'body',
            inject: true,
            chunks : ['terrazas'],
            filename : './terrazas/index.html'
         }),
    ]
};
