
/**
 * Enumearation of collections and subcollections used by the application
 * 
 */

const collections = {
    system: {
        stripe_events: 'stripe_events'
    },
    user: require('../graphql/Domain/User/Enums/collections'),
    property: require('../graphql/Domain/Property/Enums/collections'),
    reservation: require('../graphql/Domain/Reservation/Enums/collections'),
};

module.exports = collections;