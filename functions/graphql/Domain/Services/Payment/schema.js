const { gql } =  require('apollo-server-express');

const schema = gql`

    # extend type Query {
    #     # Your queries go here
    # }

    extend type Mutation {
        createStripePaymentIntent(stripe_account: ID!, amount: Int!, currency: String!, payment_method_types: [String]!, metadata: StripePaymentIntentMetadataInput ): StripePaymentIntent
        createStripeCharge(stripe_account: ID!, source: String!, amount: Int!, currency: String!, description: String, receipt_email: String metadata: StripeChargeMetadataInput, capture: Boolean ): StripeCharge
        captureStripeCharge(stripe_account: ID!, charge_id: ID!, amount: Int): StripeCharge
        createStripeRefund(stripe_account: ID!, charge_id: ID!, amount: Int, reason: String, customer_note: String): StripeRefund
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
        city: String
        country: String
        line1: String
        line2: String
        postal_code: String
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
        metadata: StripeChargeMetadata
        paid: Boolean
        payment_intent: String
        payment_method: String
        receipt_email: String
        receipt_number: String
        receipt_url: String
        refunded: Boolean
        status: String
        captured: Boolean
    }

    type StripeRefund {
        id: ID!,
        object: String,
        amount: Int,
        balance_transaction: String,
        charge: StripeCharge,
        created: Int,
        currency: String
        metadata: StripeRefundMetadata,
        payment_intent: ID,
        reason: String,
        receipt_number: String,
        source_transfer_reversal: String,
        status: String,
        transfer_reversal: String
    }

    type StripeChargeMetadata {
        user_id: ID
        reservation_id: ID
        property_id: ID
        charge_id: ID
    }

    type StripeRefundMetadata {
        customer_note: String
    }

    input StripePaymentIntentMetadataInput {
        user_id: ID
        reservation_id: ID
        property_id: ID
        charge_id: ID
    }

    input StripeChargeMetadataInput {
        user_id: ID
        reservation_id: ID
        property_id: ID
        charge_id: ID
    }
   `
;

module.exports = schema;
