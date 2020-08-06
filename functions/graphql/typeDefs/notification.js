
// Notification Schema
const {gql} = require("apollo-server-express");

const notification = gql`
    extend type Query {
        getUserNotifications: [UserNotification]
        getPropertyNotifications: [PropertyNotification]
    }

    type UserNotification {
        text: String
        type: String
        timestamp: String
        time: String
        read: Boolean
        payload: NotificationPayload 
    }

    type PropertyNotification {
        text: String
        type: String
        timestamp: String
        time: String
        read: Boolean
        property: Property
        payload: NotificationPayload 
    }

    type NotificationPayload {
        user_id: String
        identity_id: String
        property_id: String
        reservation_id: String
    }

`

module.exports = notification;
