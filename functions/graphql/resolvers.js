
const resolvers = {
    // main query
   Query: {
        getAuth: (parent, args, context) => context.auth,

        //user read queries
        getUsers: require('./resolvers/query/user/fetch/get_users'),
        getUserByID: require('./resolvers/query/user/fetch/get_user_by_id'),
        getUserByEmail: require('./resolvers/query/user/fetch/get_user_by_email'),
        getUserByPhone: require('./resolvers/query/user/fetch/get_user_by_phone'),
        getUserReservations: require('./resolvers/query/user/fetch/get_user_reservations'),
        getUserProperties: require('./resolvers/query/user/fetch/get_user_properties'),
        getUserIdentityById: require('./resolvers/query/user/fetch/get_user_identity_by_id'),
        getUserIdentityByRef: require('./resolvers/query/user/fetch/get_user_identity_by_ref'),
        getMyIdentities: require('./resolvers/query/user/fetch/get_my_identities'),
        getUserIdentities: require('./resolvers/query/user/fetch/get_user_identities'),
        getUserDevice: require('./resolvers/query/user/fetch/get_user_device'),
        getUserPayment: require('./resolvers/query/user/fetch/get_user_payment'),

        //property read queries
        getProperties: require('./resolvers/query/property/fetch/get_properties'),
        getProperty: require('./resolvers/query/property/fetch/get_property'),
        getPropertyReservations: require('./resolvers/query/property/fetch/get_property_reservations'),

        //reservation read queries
        getReservations: require('./resolvers/query/reservation/fetch/get_reservations'),
        getReservation: require('./resolvers/query/reservation/fetch/get_reservation'),
        getBookingChannels: require('./resolvers/query/reservation/fetch/get_booking_channels'),
        getReservationCheckin: require('./resolvers/query/reservation/fetch/get_reservation_checkin'),

        // organization read queries
        getOrganization: require('./resolvers/query/organization/fetch/get_organization'),
        getOrganizations: require('./resolvers/query/organization/fetch/get_organizations'),

    },

    // mutations to carry out operations
    Mutation: {

        createToken: require('./resolvers/mutations/auth/create_token'), 
        // user mutations
        confirmUser:  require('./resolvers/mutations/user/confirm_user'),
        createUser: require('./resolvers/mutations/user/create_user'),
        updateUser:  require('./resolvers/mutations/user/update_user'),
        updateUserDevice:  require('./resolvers/mutations/user/update_user_device'),
        updateUserAddress:  require('./resolvers/mutations/user/update_user_address'),
        updateUserProfileImage:  require('./resolvers/mutations/user/update_user_profile_image'),
        createUserIdentity:  require('./resolvers/mutations/user/create_user_identity'),
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
        approveReservationCheckin: require('./resolvers/mutations/reservation/approve_reservation_checkin'),
        
        // organization mutaions
        createOrganization: require('./resolvers/mutations/organization/create_organization'),
    },

    Subscription: {
        tokenChanged: require('./resolvers/subscriptions/reservation/reservation_created'),

        ReservationCreated: require('./resolvers/subscriptions/reservation/reservation_created'),
        ReservationUpdated: require('./resolvers/subscriptions/reservation/reservation_updated'),

        PropertyCreated: require('./resolvers/subscriptions/property/property_created'),
        PropertyUpdated: require('./resolvers/subscriptions/property/property_updated')

    },


    Auth: require('./resolvers/query/auth'),
    Phone: require('./resolvers/query/phone'),

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
    UserIdentity: require('./resolvers/query/user/identity'),
    UserIdentityLite: require('./resolvers/query/user/identity_lite'),

    //property
    Property: require('./resolvers/query/property'),
    PropertyAddress: require('./resolvers/query/property/address'),
    PropertyTeam: require('./resolvers/query/property/team'),
    PropertyReservation: require('./resolvers/query/property/reservation'),

    //reservation
    Reservation: require('./resolvers/query/reservation'),
    ReservationGuest: require('./resolvers/query/reservation/guest'),
    ReservationProperty: require('./resolvers/query/reservation/property'),

    // organization
    Organization: require('./resolvers/query/organization'),
    OrganizationMember: require('./resolvers/query/organization/member'),
};

module.exports = resolvers;