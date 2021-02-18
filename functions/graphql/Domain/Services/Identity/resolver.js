const resolvers = {

        queries: {
                // Your queries resolvers here
                getStripeVerificationSession: require('./Queries/GetStripeVerificationSession'),
                getStripeVerificationReport: require('./Queries/GetStripeVerificationReport'),
        },
        mutations: {
                // Your mutations resolvers here
                createStripeVerificationSession: require('./Mutations/createStripeVerificationSession'),
        },
        subscriptions: {
                // Your subscriptions resolvers here
        },
        
       };

module.exports = resolvers;
