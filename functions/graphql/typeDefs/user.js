
// User Schema
const {gql} = require("apollo-server-express");

const user = gql`

    extend type Query {
        getUsers: [User!]
        getUser(id: String!): User
        # getUserProperties(id: String!): [Property]
        # getUserReservations(id: String!): [Reservation]
        getUserVerification(id: String!): UserVerification
        getUserDevice(id: String!): UserDevice
        getUserPayment(id: String!): UserPayment
    }

    extend type Mutation {
        # Confirm if a user already exist by email
        confirmUser(email: String!): Boolean!

        # Create new user, id can be specified or not
        createUser(id: String, email: String!, phone: String!, first_name: String!, last_name: String!): User!

        # update user basic information
        updateUser(id: String!, email: String!, phone: String!, first_name: String!, last_name: String!): User!

        # update user address information
        updateUserAddress(id: String!, street: String!, city: String!, state: String!, country: String!, postal_code: String!): UserAddress

        # update user profile image
        updateUserProfileImage(id: String!, image: String): String

        # verify user identity
        verifyUserIdentity(id: String!): UserVerification

        # delete user
        deleteUser(id: String!): User

    }

    type User { 
        id: String!
        name: UserName
        email: String!
        phone: String!
        phone_verified: Boolean!
        phone_verified_at: Int
        country_of_residence: String
        profile_image: String
        address: UserAddress
        id_verified: Boolean
        reservations: [UserReservation]
        properties: [UserProperty]
    }

    type UserName {
        first_name: String
        last_name: String
    }
    
    type UserPayment {
        token: String
    }
    
    type UserAddress {
        street: String 
		city: String
        state: String
        country: String
        postal_code: String							
    }

    type UserDevice {
        id: String
    }

    type UserVerification {
        type: String
        name: String
        country: String
        state: String
        exp_date: String 
        date_of_birth: String 
        issue_date: String 
    }

    type UserReservation {
        id: String!
        name: String!
        property_id: String!
        property_name: String!
        property_city: String!
        property_country: String!
        checkin_date: String
        checkout_date: String
        role: String
    }

    type UserProperty {
        id: String!
        name: String!
        city: String!
        country: String!
        role: String!
        image: String
    }
`

module.exports = user;
