import merge from 'webpack-merge';
import common from './webpack.config.common.babel';
import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const config = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: 'bundle.min.js'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new CleanWebpackPlugin([`./${app_config.dist}`]),
    ]
});

export default config;