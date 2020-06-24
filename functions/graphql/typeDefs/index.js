const test = require('./test')
const root = require('./root')
const utility = require('./utility')
const user = require('./user')
const property = require('./property')
const reservation = require('./reservation')
const organization = require('./organization')
const notification = require('./notification')

const schemas = [root, test, user, property, reservation, organization, utility, notification]

module.exports = schemas;