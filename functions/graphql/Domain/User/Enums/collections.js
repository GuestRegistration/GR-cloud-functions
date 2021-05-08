
const collections =  {
        main: 'users',
        meta: {
            name: 'user_meta',
            documents: {}
        },
        subcollections: {
            payments: 'user_payments',
            notifications: 'user_notifications',
            devices: 'user_devices',
            stripe_identity_events: 'user_stripe_identity_events',
            stripe_payment_events: 'user_stripe_payment_events',
            stripe_identity_verifications: 'user_stripe_identity_verifications',
            stripe_property_customers: 'user_stripe_property_customers'
        },
        trash: 'users_trash'
};

module.exports = collections;