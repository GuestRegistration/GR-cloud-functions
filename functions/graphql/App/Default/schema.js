const { gql } =  require('apollo-server-express');

const schema = gql`

    extend type Query {
        # Your queries go here
    }

    extend type Mutation {
        # Your mutation goes here
    }

    extend type Subscription {
        # Your subscription goes here
    }
    # An example of another custom type definition
    type defaultType {

    }
   `
;

module.exports = schema;
