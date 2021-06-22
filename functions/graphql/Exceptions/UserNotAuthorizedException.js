const { ApolloError } = require('apollo-server-errors');

module.exports = class UserNotAuthorizedException extends ApolloError {
    constructor(message = 'User not authorized'){
        super(message, 432);
    }
};

