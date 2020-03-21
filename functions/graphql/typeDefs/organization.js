
// Organizaion Schema
const {gql} = require("apollo-server-express");

const test = gql`

    extend type Query {
        getOrganizations : [Organization]
        getOrganization(id: String!) : Organization
    }

    extend type Mutation {
        createOrganization(name: String!): Organization
    }

    type Organization {
        id: String!
        name: String!
        members: [OrganizationMember]
        token: String
    }

    type OrganizationMember {
        user_id: String!
        name: UserName
        role: String!
        is_host: Boolean!
        is_owner: Boolean!
    }

`

module.exports = test;
