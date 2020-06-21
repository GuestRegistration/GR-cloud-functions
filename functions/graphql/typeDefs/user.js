
// User Schema
const {gql} = require("apollo-server-express");

const user = gql`

    extend type Query {
        getUsers: [User!]
        getUserByID(id: String!): User
        getUserByEmail(email: String!): [User]
        getUserByPhone(phone: String!): [User]
        getUserProperties(id: String): [Property]
        getUserReservations(id: String): [Reservation]
        getUserIdentityByRef(ref: String!): UserIdentity
        getUserIdentityById(user_id: String!, identity_id: String!): UserIdentity
        getMyIdentities : [UserIdentity]
        getUserIdentities(id: String!): [UserIdentityLite]
        getUserDevice(id: String!): UserDevice
        getUserPayment(id: String!): UserPayment
    }

    extend type Mutation {
        # Confirm if a user already exist by email
        confirmUser(email: String!): Boolean!

        # Create new user, id can be specified or not
        createUser(
            id: String,
            email: String!,
            phone: String!,
            phone_country_code: String, 
            phone_number: String, 
            first_name: String!, 
            last_name: String!
        ): User!

        # update user basic information
        updateUser(
            id: String!, 
            email: String!, 
            phone: String!,
            phone_country_code: String, 
            phone_number: String, 
            first_name:String!, 
            last_name: String!
        ): User!

        # update user address information
        updateUserAddress(
            id: String!, 
            street: String, 
            city: String, 
            state: String, 
            country: String, 
            postal_code: String
        ): UserAddress

        # update user profile image
        updateUserProfileImage(
            id: String!, 
            image: String
        ): String

        # create user Identity
        createUserIdentity(
            id: String!, 
            country: String!, 
            document_type: String!, 
            document_url: String!, title: String): UserIdentity

        # delete user
        deleteUser(id: String!): User

        # update the user
        updateUserDevice(
            id: String!, 
            device_id: String!, 
            device_ip: String, 
            device_name:String
        ): UserDevice

    }

    type User { 
        id: String!
        name: UserName
        email: String!
        phone: String!
        phone_meta: Phone
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
        user_id: String!
        device_id: String!
        device_name: String
        device_ip: String
        last_updated: String!
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

    # incomplete identity data
    type UserIdentityLite {
        id: String!
        user_id: String!
        country: String!
        title: String
        verified: Boolean!
        document_type: String!
        ref: String
    }

    # Complete identity data
    type UserIdentity {
        id: String!
        user_id: String!
        country: String!
        document_type: String!
        document_url: String!
        title: String
        verified: Boolean!
        verified_at: String
        ref: String
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
