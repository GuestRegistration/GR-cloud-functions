// Reservation Schema
const {gql} = require("apollo-server-express");

const reservation = gql`
    extend type Query {
        getReservations: [Reservation!]
        getReservation(id: String!) : Reservation,
        getBookingChannels: [BookingChannel]
    }

    extend type Mutation {
        # create a new reservation
        createReservation(user_id: String!, property_id: String!, name: String!, email: String!, booking_channel: String!, booking_no: String!, amount_paid: Int!, checkin_date: String, checkout_date: String ): Reservation
        
        # update a reservation
        updateReservation(id: String!, name: String!, booking_channel: String!, booking_no: String!, amount_paid: Int!, checkin_date: String, checkout_date: String): Reservation!
   
        #add a new guest to a reservation
        addReservationGuest(id: String!, name: String!, gender: String!, type: String!): ReservationGuest

        # checkin a reservation
        checkinReservation(reservation_id: String!, user_id: String!, accepted_tnc: Boolean!, identity_ref: String!): Reservation
    }

    extend type Subscription {
        ReservationCreated: Reservation
        ReservationUpdated: Reservation
    }
    
    type Reservation {
        id: String!
        user_id: String #id of the user the reservation belongs to
        name: String!
        email: String!
        booking_channel: String!
        booking_no: String!
        no_of_guest: Int
        valid_payment: Boolean
        amount_paid: Int
        contract_signature: String
        checkin_date: String
        checkout_date: String
        instruction_sent: Boolean
        checkin_url: String
        already_checkedin: Boolean!
        checkedin_at: String # the timestamp of when the user checked in
        property: ReservationProperty
        guests: [ReservationGuest]
    }

    type ReservationProperty {
        id: String!
        name: String!
        city: String!
        country: String!
        image: String
    }

    type ReservationGuest {
        user_id: String
        name: String
        gender: String
        type: String
    }
    
    type BookingChannel {
        channel_code: Int!
        channel_name: String!
    }

`

module.exports = reservation
