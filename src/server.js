import express from 'express';
import path from 'path';
import app_config from '../app.config';
import broker from './broker';
import mqtt_client from './mqtt_client';

const PORT = app_config.port;
const PUBLIC_PATH = __dirname + `/${app_config.dist}`;

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
            contentBase: './public',
            host: 'loclahost',
            hot: true,
            stats: {
                colors: true
            },
            publicPath: webpackConfig.output.publicPath
        })
    );
    app.use(
        require('webpack-hot-middleware')(compiler, {
            publicPath: webpackConfig.output.publicPath
        })
    );
} else {
    app.use(express.static(PUBLIC_PATH));
}

app.all('*', (req, res) => {
    return res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '...');
    
    broker.start(() => { });
    let iter = 0;
    mqtt_client.connect(() => {
        setInterval(() => {
            mqtt_client.publish(`Сообщение ноиер : ${iter++}`);
        }, 5000);
    });
    mqtt_client.subscribe();
    mqtt_client.haseMessage((topic, msg) => {
        console.log(msg.toString());
    })
});