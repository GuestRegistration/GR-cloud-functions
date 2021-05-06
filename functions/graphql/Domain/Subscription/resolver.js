const resolvers = {

        queries: {
                getSubscriptionPlan: require('./Queries/GetSubscriptionPlan'),
                getPropertyAsCustomer: require('./Queries/GetPropertyAsCustomer'),
                getPropertySubscription: require('./Queries/GetPropertySubscription')
        },
        mutations: {
                createPropertyAsCustomer: require('./Mutations/CreatePropertyAsCustomer'),
                createPropertySubscription: require('./Mutations/CreatePropertySubscription'),
                cancelPropertySubscription: require('./Mutations/CancelPropertySubscription'),
                updatePropertySubscription: require('./Mutations/UpdatePropertySubscription')
        },
        subscriptions: {
                // Your subscriptions resolvers here
        },

        types: {
                // Your custom type definition resolvers here
        }
};

module.exports = resolvers;
