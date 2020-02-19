
// Test Schema
const {gql} = require("apollo-server-express");

const test = gql`

    type Test{
        param1: String!
        param2: String!
    }

    extend type Query {
        tests: [Test!]!
    }

    extend type Mutation {
        addTest(param1: String!, param2: String!): Test!
    }

`

module.exports = test;
