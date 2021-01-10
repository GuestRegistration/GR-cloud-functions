
const collections =  {
        main: 'graphQL_users',
        meta: {
            name: 'user_meta',
            documents: {
                verification: 'verification'
            }
        },
        subcollections: {
            payments: 'payments',
            identities: 'identities',
            notifications: 'user_notifications',
            devices: 'user_devices',
        },
        trash: 'graphQL_users_trash'
};

module.exports = collections;