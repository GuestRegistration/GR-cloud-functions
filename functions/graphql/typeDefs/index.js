const test = require('./test')
const root = require('./root')
const user = require('./user')
const property = require('./property')
const reservation = require('./reservation')

const schemas = [root, test, user, property, reservation]

module.exports = schemas;