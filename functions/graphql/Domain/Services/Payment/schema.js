const { gql } =  require('apollo-server-express');

const schema = gql`

    # extend type Query {
    #     # Your queries go here
    # }

    # extend type Mutation {
    #     createPaymentIntent(stripe_account: ID! amount: Int! currency: String! payment_method_types: [String]! metadata: StripePaymentIntentMetadataInput ): StripePaymentIntent
    #     createCharge(stripe_account: ID! source: String! amount: Int! currency: String! description: String receipt_email: String metadata: StripeReservationChargeMetadataInput capture: Boolean ): StripeCharge
    #     captureCharge(stripe_account: ID! charge_id: ID! amount: Int): StripeCharge
    #     createRefund(stripe_account: ID! charge_id: ID! amount: Int reason: String customer_note: String): StripeRefund
    # }

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
        net_captured: Int
    }

    type StripeRefund {
        id: ID!
        object: String
        amount: Int
        balance_transaction: String
        charge: StripeCharge
        created: Int
        currency: String
        metadata: StripeRefundMetadata
        payment_intent: ID
        reason: String
        receipt_number: String
        source_transfer_reversal: String
        status: String
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

    
    type StripeCustomer {
        id: ID!
        object: String
        address: StripeAddress
        balance: Int
        created: String
        currency: String
        description: String
        email: String
        livemode: Boolean
        metadata: StripeCustomerMetadata
        name: String
        phone: String
        default_source: String
    }

    type StripeCustomerMetadata {
        property_id: ID
        user_id: ID
    }

    type StripeCustomerSourceList {
        object: String
        url: String
        has_more: Boolean
        data: [StripeCustomerSource]
    }

    type StripeCustomerSource {
        id: ID
        object: String
        address_city: String
        address_country: String
        address_line1: String
        address_line1_check: String
        address_line2: String
        address_state: String
        address_zip: String
        address_zip_check: String
        brand: String
        country: String
        customer: ID
        cvc_check: String
        dynamic_last4: String
        exp_month: Int
        exp_year: Int
        fingerprint: String
        funding: String
        last4: String
        name: String
        tokenization_method: String
    }

    type StripeSubscription {
        id: ID!
        object: String
        cancel_at: Int
        cancel_at_period_end: Boolean
        canceled_at: Int
        collection_method: String
        created: Int
        current_period_end: Int
        current_period_start: Int
        customer: ID!
        days_until_due: Int
        default_payment_method: ID
        default_source: ID
        ended_at: Int
        items: StripeSubscriptionItems
        livemode: Boolean
        metadata: StripePropertySubscriptionMetadata
        start_date: Int
        status: String
        trial_end: Int
        trial_start: Int
    }
    
    type StripeSubscriptionItems {
        object: String
        data: [StripeSubscriptionItemData]
        has_more: Boolean
        url: String
    }

    type StripeSubscriptionItemData {
        id: ID
        object: String
        created: Int
        price: StripePrice
        quantity: Int
        subscription: ID
    }

    type StripePropertySubscriptionMetadata {
        property_id: ID
    }

    type StripePrice {
        id: ID
        object: String
        amount: Int
        active: Boolean
        billing_scheme: String
        created: Int
        currency: String
        livemode: Boolean
        nickname: String
        product: StripeProduct
        type: String
        unit_amount: Int
        unit_amount_decimal: Int
        trial_period_days: Int
        interval: String
        interval_count: Int
    }

    type StripeProduct {
        id: ID!
        object: String
        active: Boolean
        created: Int
        description: String
        images: [String]
        livemode: Boolean
        name: String
        url: String
    }

    input StripePaymentIntentMetadataInput {
        user_id: ID
        reservation_id: ID
        property_id: ID
        charge_id: ID
    }

    input StripeReservationChargeMetadataInput {
        user_id: ID!
        reservation_id: ID!
        property_id: ID!
        charge_id: ID
    }

   `
;

module.exports = schema;
