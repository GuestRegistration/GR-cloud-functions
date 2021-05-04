
// Property Schema
const {gql} = require("apollo-server-express");

const property = gql`
    extend type Query {
        getProperties: [Property!]
        getPropertyNotifications(id: String): [PropertyNotification]
        getUserProperties(id: String): [Property]
        getProperty(id: String!) : Property
        getPropertyStripeAuthorization(property_id: ID!): StripeAuthorization
        getPropertyCharges(property_id: ID!): [PropertyCharge]
        getPropertyCharge(property_id: ID!, charge_id: ID!): PropertyCharge
        getPropertyCheckinInstructionTemplates(property_id: ID!): [CheckinInstructionTemplate]
        getPropertyCheckinAgreements(property_id: ID!): [PropertyCheckinAgreement]
        getPropertyCheckinQuestions(property_id: ID!): [PropertyCheckinQuestion]
        getPropertyCustomer(property_id: ID!, user_id: ID): PropertyStripeCustomer
    }

    extend type Mutation {
        # create a new property
        createProperty(
            name: String!, 
            email: String!, 
            phone: String!,
            phone_country_code: String, 
            phone_number: String, 
            full_address: String! 
            street: String, 
            city: String, 
            state: String, 
            country: String, 
            postal_code: String,
            rules: String,
            terms: String
            ): Property

        # update property
        updateProperty(
            id: String!,
            name: String!, 
            email: String,
            phone: String!,
            phone_country_code: String, 
            phone_number: String, 
            full_address: String! 
            street: String, 
            city: String, 
            state: String, 
            country: String, 
            postal_code: String,
            rules: String,
            terms: String
        ): Property
    
        # update property display image
        updatePropertyImage(id: String!, image: String): String

        # update property rules
        updatePropertyRules(id: String!, rules: String): String

        # update property rules
        updatePropertyTerms(id: String!, terms_url: String): String

        # add a new user as a team member
        addNewTeam (id: String!, prospect_id: String, role: String!): PropertyTeam
        
        # set property Stripe authorization
        setPropertyStripeAuthorization (property_id: ID!, grant_type: String!, code: String!): StripeAuthorization
        
        # unset property Stripe authorization
        unsetPropertyStripeAuthorization (property_id: ID!): StripeDeauthorization

        # Create property charge
        createPropertyCharge (property_id: ID!, data: propertyChargeInput!): PropertyCharge
        
        # update property charge
        updatePropertyCharge (property_id: ID!, charge_id: ID!, data: propertyChargeInput!): PropertyCharge

        # Create property checkin instruction template
        createPropertyCheckinInstructionTemplate (property_id: ID!, title: String, body: String!): CheckinInstructionTemplate
        
        # update property checkin instruction template
        updatePropertyCheckinInstructionTemplate (property_id: ID!, template_id: ID!, title: String, body: String!): CheckinInstructionTemplate
        
        # update property checkin agreements
        updatePropertyCheckinAgreements (property_id: ID!, agreements: [PropertyCheckinAgreementInput]): [PropertyCheckinAgreement]

        # update property checkin questions
        updatePropertyCheckinQuestions (property_id: ID!, questions: [PropertyCheckinQuestionInput]): [PropertyCheckinQuestion]

        # create stripe customer for property
        createPropertyCustomer(property_id: ID!, user_id: ID!, name: String, source: ID!, email: String, phone: String, description: String ): PropertyStripeCustomer
        
        # update stripe customer for property
        updatePropertyCustomer(property_id: ID!, customer_id: ID!, user_id: ID!, name: String, source: ID!, email: String, phone: String, description: String ): PropertyStripeCustomer

        # add new credit card for property stripe customer
        addPropertyCustomerCreditCard(property_id: ID!, customer_id: ID! source: ID!): StripeCustomerSource

        # remove credit card from property stripe customer
        removePropertyCustomerCreditCard(property_id: ID!, customer_id: ID! card_id: ID!): Boolean

    }

    extend type Subscription {
        propertyCreated: Property
        propertyUpdated: Property
    }

    type Property {
        id: String!
        user_id: String!
        name: String!
        email: String!
        phone: String!
        phone_meta: Phone,
        full_address: String
        address: Address
        image: String
        terms: String
        rules: String
        stripe_connected: Boolean
        team: [PropertyTeam]
        reservations: [PropertyReservation]
    }

    type PropertyTeam {
        user_id: String
        name: String!
        email: String!
        role: String!
    }

    type PropertyReservation {
        id: String!
        name: String!
        checkin_date: String
        checkout_date: String
    }

    type PropertyNotification {
        id: String
        text: String
        type: String
        timestamp: String
        time: String
        read: Boolean
        property: Property
        payload: PropertyNotificationPayload 
    }

    type PropertyNotificationPayload {
        id: String
        user_id: String
        identity_id: String
        property_id: String
        reservation_id: String
    }

    type StripeAuthorization {
        access_token: String
        scope: String
        livemode: Boolean
        token_type: String
        refresh_token: String
        stripe_user_id: String
        stripe_publishable_key: String
    }

    type StripeDeauthorization {
        stripe_user_id: String
    }

    type PropertyPayment {
        stripe_authorization: StripeAuthorization
    }

    type PropertyCharge {
        id: String!
        title: String
        amount: Int
        description: String
        type: String
        enable: Boolean
        optional: Boolean
    }

    type CheckinInstructionTemplate {
        id: ID!
        title: String
        body: String
    }

    type PropertyCheckinAgreement {
        agreement: String!
        link: String
    }

    type PropertyCheckinQuestion {
        question: String!
        options: String
        required: Boolean
    }

    type PropertyStripeCustomer {
        customer: StripeCustomer
        sources: StripeCustomerSourceList
    }

    input propertyChargeInput {
        id: ID
        title: String!
        amount: Int!
        description: String!
        type: String!
        enable: Boolean!
        optional: Boolean
    }

    input PropertyCheckinAgreementInput {
        agreement: String!
        link: String
    }

    input PropertyCheckinQuestionInput {
        question: String!
        options: String
        required: Boolean
    }

`;

module.exports = property;
