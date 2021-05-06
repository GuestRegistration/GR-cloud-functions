
/**
 * Enumearation of collections and subcollections used by the application
 * 
 */

const collections = {
    system: {
        connected_stripe_identity_events: 'connected_stripe_identity_events',
        connected_stripe_connect_events: 'connected_stripe_connect_events',
        connected_stripe_payment_events: 'connected_stripe_payment_events',

        main_stripe_identity_events: 'main_stripe_identity_events',
        main_stripe_connect_events: 'main_stripe_connect_events',
        main_stripe_payment_events: 'main_stripe_payment_events',
    },
    user: require('../graphql/Domain/User/Enums/collections'),
    property: require('../graphql/Domain/Property/Enums/collections'),
    reservation: require('../graphql/Domain/Reservation/Enums/collections'),
};

module.exports = collections;