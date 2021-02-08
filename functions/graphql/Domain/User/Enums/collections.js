
const collections =  {
        main: 'graphQL_users',
        meta: {
            name: 'user_meta',
            documents: {
                verification: 'verification',
                verification_session: 'user_verification_session',
                verification_report: 'user_verification_report'
            }
        },
        subcollections: {
            payments: 'payments',
            identities: 'identities',
            notifications: 'user_notifications',
            devices: 'user_devices',
            stripe_events: 'user_stripe_events'
        },
        trash: 'graphQL_users_trash'
};

module.exports = collections;