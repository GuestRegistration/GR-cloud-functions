const functions = require('firebase-functions');
const webServer = require('../public/server');

module.exports = functions.https.onRequest(webServer());
