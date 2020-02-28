
const reservation = {
    id: (parent) => parent.id,
    user_id: (parent) => parent.user_id,
    name: (parent) => parent.name,
    email: (parent) => parent.email,
    booking_channel: (parent) => parent.booking_channel,
    booking_no: (parent) => booking_no,
    no_of_guest: (parent) => parent.no_of_guest,
    amount_paid: (parent) => parent.amount_paid,
    valid_payment: (parent) => parent.vaild_payment_details,
    contract_signature: (parent) => parent.contract_signature,
    checkin_date: (parent) => parent.checkin_date,
    checkout_date: (parent) => parent.checkout_date,
    already_checkedin: (parent) => parent.checkedin_at === null || typeof parent.checkedin_at === "undefined" ? false : true,
    checkedin_at: (parent) => parent.checkedin_at, 
    instruction_sent: (parent) => parent.instruction_sent,
    checkin_url: (parent) => parent.checkin_url,
    property: (parent) => parent.property,
    guests: (parent) => parent.guests
}

module.exports =  reservation