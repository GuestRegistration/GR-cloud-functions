const collections = {
    main: 'graphQL_properties',
    meta: {
        name: 'property_meta',
        documents: {
            stripe_authorization: 'stripe_authorization'
        }
    },
    subcollections: {
        notifications: 'property_notifications',
        charges: 'property_charges',
    },
    trash: 'graphQL_properties_trash'
};

module.exports = collections;