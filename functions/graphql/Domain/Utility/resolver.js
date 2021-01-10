const resolvers = {

        queries: {
                // Your queries resolvers here
                validatePhone: require('./Queries/ValidatePhone'),
        },
        mutations: {
                // Your mutations resolvers here
                sendPushNotification: require('./Mutations/SendPushNotification'),
        },
        subscriptions: {
                // Your subscriptions resolvers here
        },

        types: {
                // Your custom type definition resolvers here
                Phone: require('./Getters/Phone'),
                Address: require('./Getters/Address'),
        }
};

module.exports = resolvers;
