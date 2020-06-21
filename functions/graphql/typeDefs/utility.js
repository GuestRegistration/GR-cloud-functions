const {gql} = require("apollo-server-express");

const utility = gql `
    extend type Query {
        validatePhone (phone: String!): Validation
    }
    extend type Mutation {
        normalizeUserPhones: String
        normalizePropertyPhones: String
    }

    # extend type Mutation {

    # }
    type Validation {
        valid: Boolean!
        data: PhoneValidation
    }

    type PhoneValidation {
        carrier: String
        callerName: String
        addOns: String
        countryCode: String
        nationalFormat: String
        phoneNumber: String
        url: String
    }
`

module.exports = utility;
