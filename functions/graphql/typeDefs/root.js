
// The root Schema
const {gql} = require("apollo-server-express");

const root = gql`
    type Query {
        # authentication token
        getAuth: Auth
    }

    type Mutation {
        # create authentication token for client
        createToken(email: String!, password: String!): ClientToken
    }

    type Subscription {

        tokenChanged: ClientToken
    }

    type Phone {
        country_code: String
        phone_number: String
        complete_phone: String
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
module.exports = root;