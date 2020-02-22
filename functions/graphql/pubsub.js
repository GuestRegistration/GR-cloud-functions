const { PubSub } = require('apollo-server-express')
const pubsub = new PubSub()

const subscriptions = {
    auth: {
        token_change: 'TOKEN_CHANGE'
    }, 
    reservation: {
        create: 'RESERVATION_CREADTED',
        update: 'RESERVATION_UPDATED',
    },
    property: {
        create: 'PROPERTY_CREADTED',
        update: 'PROPERTY_UPDATED',
    }

}

module.exports = {subscriptions, pubsub}