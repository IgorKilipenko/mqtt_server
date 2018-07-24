import * as firebase from 'firebase';
import {firebaseConfig } from '../user.config'

const config = process.env.NODE_ENV === 'production'
  ? firebaseConfig.prodConfig
  : firebaseConfig.devConfig;

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};