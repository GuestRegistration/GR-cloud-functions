
// Property Schema
const {gql} = require("apollo-server-express");

const property = gql`
    extend type Query {
        getProperties: [Property!]
        getProperty(id: String!) : Property
        getPropertyReservations(id: String!): [Reservation]
    }

    extend type Mutation {
        # create a new property
        createProperty(
            user_id: String!,
            name: String!, 
            phone_country_code: String!, 
            phone_number: String!, 
            email: String!, 
            street: String!, 
            city: String!, 
            state: String, 
            country: String!, 
            postal_code: Int,
            rules: String,
            terms: String
            ): Property

        # update property
        updateProperty(
            id: String!,
            user_id: String!, 
            name: String!, 
            phone_country_code: String!, 
            phone_number: String!, 
            email: String!, 
            street: String!, 
            city: String!, 
            state: String, 
            country: String!, 
            postal_code: Int,
            rules: String,
            terms: String
        ): Property
    
        # update property display image
        updatePropertyImage(id: String!, user_id: String!, image: String!): String

        # add a new user as a team member
        addNewTeam (id: String!, user_id: String!, prospect_id: String, role: String!): PropertyTeam

        # update property rule
        # updatePropertyRules(id: String!, rules: String!): PropertyRules

        # update property terms
        # updatePropertyTerms (id: String!, terms_url: String!): Property
    }

    extend type Subscription {
        PropertyCreated: Property
        PropertyUpdated: Property
    }

    type Property {
        id: String!
        user_id: String!
        name: String!
        phone: PropertyPhone
        email: String!
        address: PropertyAddress!
        image: String
        terms: String
        rules: String
        team: [PropertyTeam]
        reservations: [PropertyReservation]
    }

    type PropertyPhone {
        country_code: String
        phone_number: String
        complete_phone: String
    }

    type PropertyAddress {
        street: String!
        city: String!
        state: String!
        country: String!
        postal_code: String
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

    # type PropertyRule {
    #     property_id: String
    #     rules: String
    #     updated_at: String
    # }
`

module.exports = property;
