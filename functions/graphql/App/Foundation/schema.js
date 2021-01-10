const {gql} = require("apollo-server-express");

const schema = gql`
    type Query {
        helloWorldQ: String
    }
    type Mutation {
        helloWorldM(subscribe: Boolean): String
        subscribeHelloWorld(subscribe: Boolean): String
    }
    type Subscription {
        helloWorldS: String
    }`;

module.exports = schema;