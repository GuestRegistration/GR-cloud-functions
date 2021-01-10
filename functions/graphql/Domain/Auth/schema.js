const { gql } = require('apollo-server-express');

const schema = gql`

    extend type Query {
        # authentication token
        getAuth: Auth
    }

    extend type Mutation {
         # create authentication token for client
         createToken(email: String!, password: String!): ClientToken
    }

    extend type Subscription {
        tokenChanged: ClientToken
    } 

    type Auth {
        client_token: String
        client_token_valid: Boolean
        user_token: String
        user_token_valid: Boolean
        user_uid: String
    }
    
    type ClientToken {
        email: String
        token: String
    }
   `
;

module.exports = schema;
