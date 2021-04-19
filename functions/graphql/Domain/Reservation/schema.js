// Reservation Schema
const {gql} = require("apollo-server-express");

const reservation = gql`
    extend type Query {
        getReservations: [Reservation]
        getUserReservations(id: ID): [Reservation]
        getPropertyReservations(id: ID!): [Reservation]
        getReservation(id: ID!) : Reservation
        getBookingChannels: [BookingChannel]
        getReservationCheckin (id: ID!): ReservationCheckin,
        getReservationPayments (id: ID!): [StripeCharge]
    }

    extend type Mutation {
        # create a new reservation
        createReservation(property_id: ID!, name: String!, booking_channel: String, checkin_date: String!, checkout_date: String!, instruction: String, charges: [propertyChargeInput]): Reservation
        
        # update a reservation
        updateReservation(id: ID!, name: String!, booking_channel: String, checkin_date: String, checkout_date: String, instruction: String, charges: [propertyChargeInput]): Reservation
   
        #add a new guest to a reservation
        addReservationGuest(id: ID!, name: String!, gender: String!, type: String!): ReservationGuest

        # checkin a reservation
        checkinReservation(reservation_id: ID!, identity_ref: String): Reservation

        # approve a checked in reservation
        approveReservationCheckin(id: ID!): Reservation

    }

    extend type Subscription {
        ReservationCreated: Reservation
        ReservationUpdated: Reservation
    }
    
    type Reservation {
        id: String!
        user_id: ID #id of the user the reservation belongs to
        name: String!
        email: String
        booking_channel: String
        booking_no: String
        no_of_guest: Int
        valid_payment: Boolean
        amount_paid: Int
        contract_signature: String
        checkin_date: String
        checkout_date: String
        instruction: String
        checkin_url: String
        
        already_checkedin: Boolean!
        checkedin_at: String # the timestamp of when the user checked in

        approved: Boolean!
        approved_at: String # the timestamp of when the user checked in

        property_id: ID
        property: ReservationProperty
        guests: [ReservationGuest],
        charges: [PropertyCharge],
    }

    type BookingChannel {
        channel_code: Int!
        channel_name: String!
    }

    type ReservationProperty {
        id: String!
        name: String!
        address: String
        image: String
    }

    type ReservationCheckin {
        user: User
        reservation: Reservation
        checkin: Checkin
        verifications: [UserStripeVerification]
    }

    type ReservationGuest {
        user_id: String
        name: String
        gender: String
        type: String
    }
    
    type Checkin {
        checkedin_at: String
        name: UserName
        identity_ref: String
    }

`;

module.exports = reservation;
