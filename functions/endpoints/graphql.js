const functions = require('firebase-functions');
const graphQLServer = require('../graphql/server');

module.exports = functions.https.onRequest(graphQLServer());
