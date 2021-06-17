/**
 * Load configuration based on environment
 */
const remote = require('./config-remote');

const configGenral = require('./config-general');
const env = remote.app && remote.app.env ? remote.app.env : 'local';
const configEnv = require(`./config-${env}`);

module.exports = {
    ...configGenral,
    ...configEnv
};