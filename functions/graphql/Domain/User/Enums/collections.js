
const collections =  {
        main: 'graphQL_users',
        meta: {
            name: 'user_meta',
            documents: {
                verification: 'verification',
                stripe_verification_session: 'user_stripe_verification_session',
                stripe_verification_report: 'user_stripe_verification_report'
            }
        },
        subcollections: {
            payments: 'payments',
            identities: 'identities',
            notifications: 'user_notifications',
            devices: 'user_devices',
            stripe_identity_events: 'user_stripe_identity_events'
        },
        trash: 'graphQL_users_trash'
};

module.exports = collections;