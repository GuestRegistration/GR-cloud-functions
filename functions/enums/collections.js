
/**
 * Enumearation of collections and subcollections used by the application
 * 
 */

const collections = {
    system: {
        stripe_identity_events: 'stripe_identity_events',
        stripe_connect_events: 'stripe_connect_events',
        stripe_payment_events: 'stripe_payment_events'
    },
    user: require('../graphql/Domain/User/Enums/collections'),
    property: require('../graphql/Domain/Property/Enums/collections'),
    reservation: require('../graphql/Domain/Reservation/Enums/collections'),
};

module.exports = collections;