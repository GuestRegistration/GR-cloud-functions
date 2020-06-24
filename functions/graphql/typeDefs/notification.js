
// Notification Schema
const {gql} = require("apollo-server-express");

const notification = gql`
    extend type Query {
        getUserNotifications: [UserNotification]
    }

    type UserNotification{
        text: String
        timestamp: String
        time: String
        read: Boolean
    }
`

module.exports = notification;
