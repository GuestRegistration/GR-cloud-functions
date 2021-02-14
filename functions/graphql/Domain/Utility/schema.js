const { gql } =  require('apollo-server-express');

const schema = gql`

    extend type Query {
        # Your queries go here
        validatePhone (phone: String!): PhoneValidation
        getStripeFile(id: ID!): StripeFile
    }

    extend type Mutation {
        # Your mutation goes here
        sendPushNotification(user_id: String, token: String, title: String!, body: String!, icon: String ): String
        Normalization: Boolean
    }

    # extend type Subscription {
    #     # Your subscription goes here
    # }

    type Phone {
        country_code: String
        phone_number: String
        complete_phone: String
    }

    type Address {
        street: String 
		city: String
        state: String
        country: String
        postal_code: String							
    }

    type PhoneValidation {
        valid: Boolean!
        data: PhoneValidationData
    }

    type PhoneValidationData {
        carrier: String
        callerName: String
        addOns: String
        countryCode: String
        nationalFormat: String
        phoneNumber: String
        url: String
    }

    type StripeFile {
        id: ID
        object: String
        created: String
        expires_at: String
        filename: String
        links: StripeFileLinks
        purpose: String
        size: Int
        title: String
        type: String
        url: String
        img_src: String
    }
        type StripeFileLinks {
            object: String
            has_more: Boolean
            url: String
        }
`;

module.exports = schema;
