const resolvers = {

        queries: {
                // Your queries resolvers here
                getProperties: require('./Queries/GetProperties'),
                getPropertyNotifications: require('./Queries/GetPropertyNotifications'),
                getUserProperties: require('./Queries/GetUserProperties'),
                getProperty: require('./Queries/GetProperty'),
        },
        mutations: {
                // Your mutations resolvers here
                createProperty: require('./Mutations/CreateProperty'),
                updateProperty: require('./Mutations/UpdateProperty'),
                updatePropertyImage: require('./Mutations/UpdatePropertyImage'),
                updatePropertyRules: require('./Mutations/UpdatePropertyRules'),
                updatePropertyTerms: require('./Mutations/UpdatePropertyTerms'),
                addNewTeam: require('./Mutations/AddNewTeam'),
        },
        subscriptions: {
                // Your subscriptions resolvers here
                propertyCreated: require('./Subscriptions/PropertyCreated'),
                propertyUpdated: require('./Subscriptions/PropertyUpdated'),
        },

        types: {
                // Your custom type definition resolvers here
                Property: require('./Getters/index'),
                PropertyTeam: require('./Getters/Team'),
                PropertyReservation: require('./Getters/Reservation'),
                PropertyNotification: require('./Getters/Notification'),
                PropertyNotificationPayload: require('./Getters/NotificationPayload'),
        }
};

module.exports = resolvers;
