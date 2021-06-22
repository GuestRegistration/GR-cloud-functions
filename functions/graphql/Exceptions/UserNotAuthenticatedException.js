const { ApolloError } = require('apollo-server-errors');

module.exports = class UserNotAuthenticatedException extends ApolloError  {
    constructor(message = "Not authenticated"){
        super(message, 421);
    }
  };
