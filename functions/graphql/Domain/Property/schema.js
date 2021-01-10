
// Property Schema
const {gql} = require("apollo-server-express");

const property = gql`
    extend type Query {
        getProperties: [Property!]
        getPropertyNotifications(id: String): [PropertyNotification]
        getUserProperties(id: String): [Property]
        getProperty(id: String!) : Property
    }

    extend type Mutation {
        # create a new property
        createProperty(
            name: String!, 
            email: String!, 
            phone: String!,
            phone_country_code: String, 
            phone_number: String, 
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
            phone: String!,
            phone_country_code: String, 
            phone_number: String, 
            email: String, 
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
        address: Address
        image: String
        terms: String
        rules: String
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

`;

module.exports = property;
