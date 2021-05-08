const collections = {
    main: 'properties',
    meta: {
        name: 'property_meta',
        documents: {
            stripe_authorization: 'stripe_authorization',
            stripe_customer: 'stripe_customer',
            stripe_subscription: 'stripe_subscription',
            checkin_agreements: 'checkin_agreements',
            checkin_questions: 'checkin_questions'
        }
    },
    subcollections: {
        notifications: 'property_notifications',
        charges: 'property_charges',
        checkin_instructions: 'property_checkin_instructions',
        stripe_customers: 'property_stripe_customers'
    },
    trash: 'properties_trash'
};

module.exports = collections;