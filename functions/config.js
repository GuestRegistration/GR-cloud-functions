/**
 * Load configuration based on environment
 */
const remote = require('./config-remote');

const env = remote.app && remote.app.env ? remote.app.env : 'local';
const config = require(`./config-${env}`)

module.exports = config;