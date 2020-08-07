const functions = require('firebase-functions')
// server setup
const server = require("../public/server")

module.exports = functions.https.onRequest(server);
