const resolvers = {

        queries: {
                // Your queries resolvers here
                getProperties: require('./Queries/GetProperties'),
                getPropertyNotifications: require('./Queries/GetPropertyNotifications'),
                getUserProperties: require('./Queries/GetUserProperties'),
                getProperty: require('./Queries/GetProperty'),
                getPropertyStripeAuthorization: require('./Queries/GetPropertyStripeAuthorization'),
                getPropertyCharges: require('./Queries/GetPropertyCharges'),
                getPropertyCharge: require('./Queries/GetPropertyCharge'),
                getPropertyCheckinInstructionTemplates: require('./Queries/GetPropertyCheckinInstructionTemplates'),
                getPropertyCheckinAgreements: require('./Queries/GetPropertyCheckinAgreements'),
                getPropertyCheckinQuestions: require('./Queries/GetPropertyCheckinQuestions'),
                getPropertyCustomer: require('./Queries/GetPropertyCustomer')
        },
        mutations: {
                // Your mutations resolvers here
                createProperty: require('./Mutations/CreateProperty'),
                updateProperty: require('./Mutations/UpdateProperty'),
                updatePropertyImage: require('./Mutations/UpdatePropertyImage'),
                updatePropertyRules: require('./Mutations/UpdatePropertyRules'),
                updatePropertyTerms: require('./Mutations/UpdatePropertyTerms'),
                addNewTeam: require('./Mutations/AddNewTeam'),
                setPropertyStripeAuthorization: require('./Mutations/SetPropertyStripeAuthorization'),
                unsetPropertyStripeAuthorization: require('./Mutations/UnsetPropertyStripeAuthorization'),
                createPropertyCharge: require('./Mutations/CreatePropertyCharge'),
                updatePropertyCharge: require('./Mutations/UpdatePropertyCharge'),
                createPropertyCheckinInstructionTemplate: require('./Mutations/CreatePropertyCheckinInstructionTemplate'),
                updatePropertyCheckinInstructionTemplate: require('./Mutations/UpdatePropertyCheckinInstructionTemplate'),
                updatePropertyCheckinQuestions: require('./Mutations/UpdatePropertyCheckinQuestions'),
                updatePropertyCheckinAgreements: require('./Mutations/UpdatePropertyCheckinAgreements'),
                createPropertyCustomer: require('./Mutations/CreatePropertyCustomer'),
                updatePropertyCustomer: require('./Mutations/UpdatePropertyCustomer'),
                addPropertyCustomerCreditCard: require('./Mutations/AddPropertyCustomerCreditCard'),
                removePropertyCustomerCreditCard: require('./Mutations/RemovePropertyCustomerCreditCard'),

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
