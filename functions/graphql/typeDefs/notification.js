
// Notification Schema
const {gql} = require("apollo-server-express");

const notification = gql`
    extend type Query {
        getUserNotifications: [UserNotification]
        getPropertyNotifications(property_id: String!): [PropertyNotification]
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
    }
`

module.exports = notification;
