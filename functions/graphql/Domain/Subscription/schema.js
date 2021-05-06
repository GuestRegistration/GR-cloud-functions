const { gql } =  require('apollo-server-express');

const schema = gql`

    extend type Query {
        getSubscriptionPlan: StripePrice
        getPropertyAsCustomer(property_id: ID!): PropertyAsCustomer
        getPropertySubscription(property_id: ID!): StripeSubscription
    }

    extend type Mutation {
        createPropertyAsCustomer(property_id: ID!, source: ID!): PropertyAsCustomer
        createPropertySubscription(property_id: ID!, customer_id: ID, credit_card_id: ID): StripeSubscription
        updatePropertySubscription(property_id: ID!, update: PropertySubscriptionUpdateInput): StripeSubscription
        cancelPropertySubscription(property_id: ID!): StripeSubscription
    }

    # extend type Subscription {
    #     # Your subscription goes here
    # }
    
    type PropertyAsCustomer {
        customer: StripeCustomer
        sources: StripeCustomerSourceList
    }

    input PropertySubscriptionUpdateInput {
        cancel_at_period_end: Boolean
        default_source: ID
    }

   `
;

module.exports = schema;
