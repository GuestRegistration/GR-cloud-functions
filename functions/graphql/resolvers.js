
const resolvers = {
    // main query
   Query: {
        getAuth: (parent, args, context) => context.auth,

        //user read queries
        getUsers: require('./resolvers/query/user/fetch/get_users'),
        getUserByID: require('./resolvers/query/user/fetch/get_user_by_id'),
        getUserByEmail: require('./resolvers/query/user/fetch/get_user_by_email'),
        getUserByPhone: require('./resolvers/query/user/fetch/get_user_by_phone'),
        // getUserReservations: require('./resolvers/query/user/fetch/get_user_reservations'),
        // getUserProperties: require('./resolvers/query/user/fetch/get_user_properties'),
        getUserVerification: require('./resolvers/query/user/fetch/get_user_verification'),
        getUserDevice: require('./resolvers/query/user/fetch/get_user_device'),
        getUserPayment: require('./resolvers/query/user/fetch/get_user_payment'),

        //property read queries
        getProperties: require('./resolvers/query/property/fetch/get_properties'),
        getProperty: require('./resolvers/query/property/fetch/get_property'),
        getPropertyReservations: require('./resolvers/query/property/fetch/get_property_reservations'),

        //reservation read queries
        getReservations: require('./resolvers/query/reservation/fetch/get_reservations'),
        getReservation: require('./resolvers/query/reservation/fetch/get_reservation')
    },

    // mutations to carry out operations
    Mutation: {

        createToken: require('./resolvers/mutations/auth/create_token'), 
        // user mutations
        confirmUser:  require('./resolvers/mutations/user/confirm_user'),
        createUser: require('./resolvers/mutations/user/create_user'),
        updateUser:  require('./resolvers/mutations/user/update_user'),
        updateUserAddress:  require('./resolvers/mutations/user/update_user_address'),
        updateUserProfileImage:  require('./resolvers/mutations/user/update_user_profile_image'),
        verifyUserIdentity:  require('./resolvers/mutations/user/verify_user_identity'),
        deleteUser:  require('./resolvers/mutations/user/delete_user'),

        //property mutations
        createProperty: require('./resolvers/mutations/property/create_property'),
        updateProperty: require('./resolvers/mutations/property/update_property'),
        updatePropertyImage: require('./resolvers/mutations/property/update_property_image'),
        addNewTeam: require('./resolvers/mutations/property/add_new_team'),

        // reservation mutations
        createReservation: require('./resolvers/mutations/reservation/create_reservation'),
        updateReservation: require('./resolvers/mutations/reservation/update_reservation'),
        addReservationGuest: require('./resolvers/mutations/reservation/add_reservation_guest'),
        checkinReservation: require('./resolvers/mutations/reservation/checkin_reservation'),
    },

    Subscription: {
        tokenChanged: require('./resolvers/subscriptions/reservation/reservation_created'),

        ReservationCreated: require('./resolvers/subscriptions/reservation/reservation_created'),
        ReservationUpdated: require('./resolvers/subscriptions/reservation/reservation_updated'),

        PropertyCreated: require('./resolvers/subscriptions/property/property_created'),
        PropertyUpdated: require('./resolvers/subscriptions/property/property_updated')

    },


    Auth: require('./resolvers/query/auth'),

    /**
     * models resolvers
     */

    //user
    User: require('./resolvers/query/user'),
    UserName: require('./resolvers/query/user/name'),
    UserDevice: require('./resolvers/query/user/device'),
    UserPayment:require('./resolvers/query/user/payment'),
    UserReservation: require('./resolvers/query/user/reservation'),
    UserProperty: require('./resolvers/query/user/property'),
    UserVerification: require('./resolvers/query/user/verification'),

    //property
    Property: require('./resolvers/query/property'),
    PropertyTeam: require('./resolvers/query/property/team'),
    PropertyRule: require('./resolvers/query/property/rule'),
    PropertyReservation: require('./resolvers/query/property/reservation'),

    //reservation
    Reservation: require('./resolvers/query/reservation'),
    ReservationGuest: require('./resolvers/query/reservation/guest'),
    ReservationProperty: require('./resolvers/query/reservation/property')
};

module.exports = resolvers;