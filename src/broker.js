import app_config from '../app.config';
import mosca from 'mosca';


const ascoltatore = {
    //using ascoltatore
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt_test',
    pubsubCollection: 'ascoltatori',
    mongo: {}
};
const settings = {
    port: app_config.mosca_port,
    backend: ascoltatore
}

class Broker {
    constructor() {
        this.server = new mosca.Server(settings);
    }

    start = (setup) => {
        console.log("Broker started");
        this.server.on('clientConnected', client => {
            console.log('client connected', client.id);
        });

        this.server.on('published', (packet, client) => {
            console.log('Published', packet.payload);
        });

        this.server.on('ready', setup);
    }
}

export default new Broker();