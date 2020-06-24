const functions = require('firebase-functions')
// Apollo server setup
const configureServer = require("../graphql/server")
//initialize the server
const server = configureServer();

module.exports = functions.https.onRequest(server);
