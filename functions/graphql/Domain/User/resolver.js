module.exports = {
        queries: {
                getUsers: require('./Queries/GetUsers'),
                getUserByID: require('./Queries/GetUserByID'),
                getUserByField: require('./Queries/GetUserByField'),
                getUserNotifications: require('./Queries/GetUserNotifications'),
                getUserIdentityByRef: require('./Queries/GetUserIdentityByRef'),
                getUserIdentityById: require('./Queries/GetUserIdentityById'),
                getUserIdentities: require('./Queries/GetUserIdentities'),
                getUserDevices: require('./Queries/GetUserDevices'),
                getUserStripeVerifications: require('./Queries/GetUserStripeVerifications'),
                getUserStripeVerificationSession: require('./Queries/GetUserStripeVerificationSession'),
                getUserStripeVerificationReport: require('./Queries/GetUserStripeVerificationReport'),
                getUserPropertyCustomer: require('./Queries/GetUserPropertyCustomer')
        },

        mutations: {
                createUser: require('./Mutations/CreateUser'),
                updateUser: require('./Mutations/UpdateUser'),
                updateUserEmail: require('./Mutations/UpdateUserEmail'),
                updateUserPhone: require('./Mutations/UpdateUserPhone'),
                updateUserAddress: require('./Mutations/UpdateUserAddress'),
                updateUserProfileImage: require('./Mutations/UpdateUserProfileImage'),
                createUserIdentity: require('./Mutations/CreateUserIdentity'),
                deleteUser: require('./Mutations/DeleteUser'),
                updateUserDevice: require('./Mutations/UpdateUserDevice'),
                createUserStripeVerificationSession: require('./Mutations/createUserStripeVerificationSession')
        },

        subscriptions: {

        },

        types: {
                User: require('./Getters/index'),
                UserName: require('./Getters/Name'),
                UserDevice: require('./Getters/Device'),
                UserNotification: require('./Getters/Notification'),
                UserNotificationPayload: require('./Getters/NotificationPayload'),
                UserIdentity: require('./Getters/Identity'),
                UserReservation: require('./Getters/Reservation'),
                UserProperty: require('./Getters/Property'),
        }
};
