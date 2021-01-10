const functions = require('firebase-functions');
const restServer = require('../rest/server');

module.exports = functions.https.onRequest(restServer());
