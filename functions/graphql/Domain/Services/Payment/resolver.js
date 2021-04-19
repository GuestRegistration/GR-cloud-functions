const resolvers = {

    queries: {
    },
    mutations: {
        createStripePaymentIntent: require('./Mutations/createStripePaymentIntent'),
        createStripeCharge: require('./Mutations/createStripeCharge')
    },
    subscriptions: {
            // Your subscriptions resolvers here
    },

    types: {
            // Your custom type definition resolvers here
    }
};

module.exports = resolvers;
