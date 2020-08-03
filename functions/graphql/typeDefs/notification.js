
// Notification Schema
const {gql} = require("apollo-server-express");

const notification = gql`
    extend type Query {
        getUserNotifications: [UserNotification]
        getPropertyNotifications: [PropertyNotification]
    }

    type UserNotification {
        text: String
        timestamp: String
        time: String
        read: Boolean
    }

    type PropertyNotification {
        text: String
        timestamp: String
        time: String
        read: Boolean
        property: Property
    }
`

module.exports = notification;
