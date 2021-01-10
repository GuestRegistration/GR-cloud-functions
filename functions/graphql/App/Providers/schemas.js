const root = require('../Foundation/schema');
const register = require('../SchemasRegister');

const schemas =  [root].concat(register);

module.exports = schemas;