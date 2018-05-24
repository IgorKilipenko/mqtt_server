import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import app_config from './app.config';

const host = app_config.host;
const port = app_config.port;

export default  {
    entry: ['whatwg-fetch', 'babel-polyfill', path.resolve(__dirname, `./${app_config.src}/client/index.js`)],
    output: {
        path: path.resolve(__dirname, `./${app_config.dist}`) ,
        publicPath: '/'
        //filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 8000,
                    name: 'images/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: require.resolve('file-loader'),
                options: {
                    name: '[name].[ext]',
                    outputPath: __dirname + 'fonts/'
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `./${app_config.src}/client/index.html`,
            //filename: 'index.html',
            inject: 'body'
        }),
        
    ]
};