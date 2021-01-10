const resolvers = {

        queries: {
                // Your queries resolvers here
                getReservations: require('./Queries/GetReservations'),
                getUserReservations: require('./Queries/GetUserReservations'),
                getPropertyReservations: require('./Queries/GetPropertyReservations'),
                getReservation: require('./Queries/GetReservation'),
                getBookingChannels: require('./Queries/GetBookingChannels'),
                getReservationCheckin: require('./Queries/GetReservationCheckin'),
        },
        mutations: {
                // Your mutations resolvers here
                createReservation: require('./Mutations/CreateReservation'),
                updateReservation: require('./Mutations/UpdateReservation'),
                addReservationGuest: require('./Mutations/AddReservationGuest'),
                checkinReservation: require('./Mutations/CheckinReservation'),
                approveReservationCheckin: require('./Mutations/ApproveReservationCheckin'),
        },
        subscriptions: {
                // Your subscriptions resolvers here
                ReservationCreated: require('./Subscriptions/ReservationCreated'),
                ReservationUpdated: require('./Subscriptions/ReservationUpdated')
        },

        types: {
                // Your custom type definition resolvers here
                Reservation: require('./Getters/index'),
                ReservationProperty: require('./Getters/Property'),
                ReservationGuest: require('./Getters/Guest')
        }
};

module.exports = resolvers;
