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
        createReservation(property_id: ID!, name: String!, booking_no: String, checkin_date: String!, checkout_date: String!, instruction: String, charges: [propertyChargeInput], agreements: [PropertyCheckinAgreementInput], questions: [PropertyCheckinQuestionInput] ): Reservation
        
        # update a reservation
        updateReservation(id: ID!, name: String!, checkin_date: String, checkout_date: String, instruction: String, charges: [propertyChargeInput], agreements: [PropertyCheckinAgreementInput], questions: [PropertyCheckinQuestionInput]): Reservation
   
        #add a new guest to a reservation
        addReservationGuest(id: ID!, name: String!, gender: String!, type: String!): ReservationGuest

        # checkin a reservation
        checkinReservation(reservation_id: ID!, agreements: [ReservationCheckinAgreementInput], questions: [ReservationCheckinQuestionInput] ): Reservation

        # approve a checked in reservation
        approveReservationCheckin(id: ID!): Reservation

        createReservationCharge(stripe_account: ID!, source: String!, amount: Int!, currency: String!, description: String, receipt_email: String metadata: StripeChargeMetadataInput, capture: Boolean ): StripeCharge
        
        captureReservationCharge(stripe_account: ID!, charge_id: ID!, amount: Int): StripeCharge

        refundReservationCharge(stripe_account: ID!, charge_id: ID!, amount: Int, reason: String, customer_note: String): StripeRefund
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
        agreements: [PropertyCheckinAgreement]
        questions: [PropertyCheckinQuestion]
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
        name: UserName
        agreements: [ReservationCheckinAgreement],
        questions: [ReservationCheckinQuestion],
        checkedin_at: String
    }

    type ReservationCheckinAgreement {
        agreement: String!
        link: String
    }

    type ReservationCheckinQuestion {
        question: String!
        options: String
        required: Boolean
        response: String
    }

    input ReservationCheckinAgreementInput {
        agreement: String!
        link: String
    }

    input ReservationCheckinQuestionInput {
        question: String!
        options: String
        required: Boolean
        response: String
    }


`;

module.exports = reservation;
