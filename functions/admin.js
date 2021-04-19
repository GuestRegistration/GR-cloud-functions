const admin = require('firebase-admin');
const config = require('./config');

const remote = require('./config-remote');

const env = remote.app && remote.app.env ? remote.app.env : 'local';
const serviceAccount = env === 'prod' ? require('./service-account-key-prod.json') : require('./service-account-key-dev.json') 

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebase.databaseURL
});

module.exports = firebaseAdmin;