
const { ApolloError } = require('apollo-server-errors');

module.exports = class ClientNotAuthorized extends ApolloError {
    constructor(message = 'Client Not authorized'){
        super(message, 411);
    }
  };
