
const reservation = {
    id: (parent) => parent.id,
    user_id: (parent) => parent.user_id,
    name: (parent) => parent.name,
    email: (parent) => parent.email,
    booking_channel: (parent) => parent.booking_channel,
    booking_no: (parent) => booking_no,
    no_of_guest: (parent) => parent.guests ? parent.guests.length : 0,
    amount_paid: (parent) => parent.amount_paid,
    valid_payment: (parent) => parent.vaild_payment_details,
    contract_signature: (parent) => parent.contract_signature,
    checkin_date: (parent) => parent.checkin_date,
    checkout_date: (parent) => parent.checkout_date,
    already_checkedin: (parent) => parent.checkedin_at === null || typeof parent.checkedin_at === "undefined" ? false : true,
    checkedin_at: (parent) => parent.checkedin_at, 
    instruction: (parent) => parent.instruction,
    checkin_url: (parent) => `https://testapp.guestregistration.com/r/${parent.id}`,
    property: (parent) => parent.property,
    guests: (parent) => parent.guests
}

module.exports =  reservation