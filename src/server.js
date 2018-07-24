import express from 'express';
import path from 'path';
import app_config from '../app.config';
import broker from './broker';
import mqtt_client from './mqtt_client';

const PORT = app_config.port;
const PUBLIC_PATH = path.resolve(__dirname, `../${app_config.dist}`); //__dirname + `../${app_config.dist}`;

const app = express();
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config.dev.babel').default;
    const compiler = webpack(webpackConfig);
    console.log(webpackConfig.entry);
    //console.log(webpackConfig.output.publicPath);
    app.use(
        require('webpack-dev-middleware')(compiler, {
            contentBase: 'src',
            host: 'loclahost',
            hot: true,
            stats: {
                colors: true,
                hash: false,
                timings: true,
                chunks: false,
                chunkModules: false,
                modules: false
            },
            publicPath: webpackConfig.output.publicPath
        })
    );
    app.use(
        require('webpack-hot-middleware')(compiler, {
            publicPath: webpackConfig.output.publicPath
        })
    );
    app.use('*', (req, res, next) => {
        const filename = path.resolve(compiler.outputPath, 'index.html');
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    });
} else {
    app.use(express.static(PUBLIC_PATH));
}

app.all('*', (req, res) => {
    return res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '...');

    broker.start(() => {});
    // let iter = 0;
    // mqtt_client.connect(() => {
    //     setInterval(() => {
    //         mqtt_client.publish(`Сообщение ноиер : ${iter++}`);
    //     }, 5000);
    // });
    // mqtt_client.subscribe();
    // mqtt_client.haseMessage((topic, msg) => {
    //     console.log(msg.toString());
    // })
});
