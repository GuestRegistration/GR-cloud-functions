const {gql} = require("apollo-server-express");

const user = gql`

    extend type Query {
        getUsers: [User!]
        getUserByID(id: String! ): User
        getUserByField(field: String!, value: String! ): [User]
        getUserNotifications: [UserNotification]
        getUserIdentityByRef(ref: String!): UserIdentity
        getUserIdentityById(user_id: String!, identity_id: String!): UserIdentity
        getUserIdentities(id: String): [UserIdentity]
        getUserDevices(id: String): [UserDevice],
        
    }

    extend type Mutation {
        # Create new user, id can be specified or not
        createUser(
            id: String,
            email: String,
            phone: String,
            phone_country_code: String, 
            phone_number: String, 
            first_name: String!, 
            last_name: String!
            # These device information are optional and can be set later with updateUserDevice mutation
            device_id: String, 
            device_ip: String,
            device_name: String,
            notification_token: String
        ): User!

        # update user basic information
        updateUser(
            id: String!, 
            email: String, 
            phone: String,
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
        ): Address

        updateUserPhone(
            id: String!, 
            phone: String,
            phone_country_code: String, 
            phone_number: String, 
        ): Boolean

        updateUserEmail(
            id: String!, 
            email: String
        ): Boolean

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
            user_id: String, 
            device_id: String, 
            device_ip: String, 
            device_name:String,
            notification_token: String
        ): UserDevice

    }

    type User { 
        id: String!
        name: UserName
        email: String
        phone: String
        phone_meta: Phone
        phone_verified: Boolean
        phone_verified_at: Int
        country_of_residence: String
        profile_image: String
        id_verified: Boolean
        address: Address
        reservations: [UserReservation]
        properties: [UserProperty]
    }

    type UserName {
        first_name: String
        last_name: String
    }
    
   

    type UserDevice {
        user_id: String!
        device_id: String
        device_name: String
        device_ip: String
        notification_token: String
        last_updated: String
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
        name: String
        property_id: String!
        property_name: String
        property_city: String
        property_country: String
        property_image: String
        checkin_date: String
        checkout_date: String
        role: String
    }

    type UserProperty {
        id: String!
        name: String!
        city: String
        country: String
        role: String
        image: String
    }

    type UserNotification {
        id: String
        text: String
        type: String
        timestamp: String
        time: String
        read: Boolean
        payload: UserNotificationPayload 
    }

    type UserNotificationPayload {
        id: String
        user_id: String
        identity_id: String
        property_id: String
        reservation_id: String
    }
    `
;
module.exports = user;