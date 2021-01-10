
const collections =  {
        main: 'graphQL_users',
        meta: {
            name: 'user_meta',
        },
        subcollections: {
            payments: 'payments',
            identities: 'identities',
            notifications: 'user_notifications',
            devices: 'user_devices',
            verification: 'user_verification',
        },
        trash: 'graphQL_users_trash'
};

module.exports = collections;