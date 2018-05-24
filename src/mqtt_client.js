import mqtt from 'mqtt';

class Client {
    constructor(){
        this.client = mqtt.connect('mqtt://192.168.1.50');
    }

    connect = callback => {
        this.client.on('connect', callback);
    }

    publish = (data) => {
        this.client.publish('testTopic', data);
    }

    subscribe = () => {
        this.client.on('connect', () => {
            this.client.subscribe('testTopic');
        })
    }

    haseMessage = (callback) => {
        this.client.on('message', callback);
    }

}

export default new Client();