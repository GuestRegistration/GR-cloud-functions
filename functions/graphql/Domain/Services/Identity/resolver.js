const resolvers = {

        queries: {
                // Your queries resolvers here
                getVerificationSession: require('./Queries/GetVerificationSession'),
                getVerificationReport: require('./Queries/GetVerificationReport'),
        },
        mutations: {
                // Your mutations resolvers here
                createVerificationSession: require('./Mutations/createVerificationSession'),
        },
        subscriptions: {
                // Your subscriptions resolvers here
        },
        
       };

module.exports = resolvers;
