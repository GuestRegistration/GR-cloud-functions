const { gql } =  require('apollo-server-express');

const schema = gql`

    # extend type Query {
    #     # Your queries go here
    # }

    extend type Mutation {
        createStripePaymentIntent(stripe_account: String!, amount: Int!, currency: String!, payment_method_types: [String]!, metadata: StripePaymentIntentMetadataInput ): StripePaymentIntent
    }

    # extend type Subscription {
    #     # Your subscription goes here
    # }


    type StripePaymentIntent {
        id: ID!
        object: String!
        amount: Int!
        currency: String
        client_secret: String!
        metadata: StripePaymentIntentMetadata
    }

    type StripePaymentIntentMetadata {
        user_id: ID
        reservation_id: ID
        property_id: ID
        charge_id: ID
    }

    type StripeAddress {
        city: String,
        country: String,
        line1: String,
        line2: String,
        postal_code: String,
        state: String
    }

    type StripeBilling {
        address: StripeAddress
        email: String
        name: String
        phone: String
    }

    type StripeCharge {
        id: ID
        object: String
        amount: Int
        amount_captured: Int
        amount_refunded: Int
        billing_details: StripeBilling
        created: Int
        currency: String
        description: String
        disputed: Boolean
        livemode: Boolean
        metadata: StripePaymentIntentMetadata
        paid: Boolean
        payment_intent: String
        payment_method: String
        receipt_email: String
        receipt_number: String
        receipt_url: String
        refunded: Boolean,
    }

    input StripePaymentIntentMetadataInput {
        user_id: ID
        reservation_id: ID
        property_id: ID
        charge_id: ID
    }
   `
;

module.exports = schema;
