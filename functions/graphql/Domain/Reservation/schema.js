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
        createReservation(property_id: ID!, data: ReservationInput!): Reservation
        
        # update a reservation
        updateReservation(id: ID!, data: ReservationInput!): Reservation
   
        #add a new guest to a reservation
        addReservationGuest(id: ID!, name: String!, gender: String!, type: String!): ReservationGuest

        # checkin a reservation
        checkinReservation(reservation_id: ID!, agreements: [ReservationCheckinAgreementInput], questions: [ReservationCheckinQuestionInput], verification: ReservationIdVerificationInput, credit_card: ReservationCreditCardInput, signature: String! ): Reservation

        # approve a checked in reservation
        approveReservationCheckin(id: ID!): Reservation

        createReservationCharge(property_id: ID!, source: String!, customer: ID, amount: Int!, currency: String!, description: String, receipt_email: String, metadata: StripeReservationChargeMetadataInput, capture: Boolean ): StripeCharge
        
        captureReservationCharge(property_id: ID!, charge_id: ID!, amount: Int): StripeCharge

        refundReservationCharge(property_id: ID!, charge_id: ID!, amount: Int, reason: String, customer_note: String): StripeRefund
    }

    extend type Subscription {
        ReservationCreated: Reservation
        ReservationUpdated: Reservation
    }
    
    type Reservation {
        id: String!
        user_id: ID #id of the user the reservation belongs to
        name: String!
        booking_reference: ID
        booking_channel: String
        room: ID
        balance: Int
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

        no_of_guest: Int
        guests: [ReservationGuest]

        charges: [PropertyCharge]
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
        verification: UserStripeVerification
    }

    type ReservationGuest {
        user_id: String
        name: String
        gender: String
        type: String
    }
    
    type Checkin {
        name: UserName
        agreements: [ReservationCheckinAgreement]
        questions: [ReservationCheckinQuestion]
        credit_card: ReservationCreditCard
        checkedin_at: String
        signature: String
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

    type ReservationCreditCard {
        id: ID,
        brand: String
        customer: ID
        exp_month: Int,
        exp_year: Int,
        last4: String,
        name: String,
    }

    input ReservationInput {
        name: String!
        booking_reference: ID
        booking_channel: String
        room: ID
        balance: Int
        checkin_date: String!
        checkout_date: String!
        instruction: String
        charges: [propertyChargeInput]
        agreements: [PropertyCheckinAgreementInput]
        questions: [PropertyCheckinQuestionInput] 
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

    input ReservationIdVerificationInput {
        property_id: ID
        session: ID
        report: ID
        status: String
        url: String
        type: String
        metadata: ReservationIdVerificationMetaDataInput
    }

    input ReservationIdVerificationMetaDataInput {
        user_id: ID
        property_id: ID
        reservation_id: ID
    }

    input ReservationCreditCardInput {
        id: ID,
        brand: String
        customer: ID
        exp_month: Int,
        exp_year: Int,
        last4: String,
        name: String,
    }

`;

module.exports = reservation;
