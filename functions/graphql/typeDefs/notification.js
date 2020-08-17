
// Notification Schema
const {gql} = require("apollo-server-express");

const notification = gql`
    extend type Query {
        getUserNotifications: [UserNotification]
        getPropertyNotifications: [PropertyNotification]
    }

    extend type Mutation {
        deleteUserNotification(id: String!) : Boolean
        deletePropertyNotification(property_id: String, id: String) : Boolean
    }

    type UserNotification {
        id: String
        text: String
        type: String
        timestamp: String
        time: String
        read: Boolean
        payload: NotificationPayload 
    }

    type PropertyNotification {
        id: String
        text: String
        type: String
        timestamp: String
        time: String
        read: Boolean
        property: Property
        payload: NotificationPayload 
    }

    type NotificationPayload {
        id: String
        user_id: String
        identity_id: String
        property_id: String
        reservation_id: String
    }

`

module.exports = notification;
