
const config = require('../../../../config');
const reservation = {
    id: (parent) => parent.id,
    user_id: (parent) => parent.user_id,
    name: (parent) => parent.name,
    email: (parent) => parent.email,
    booking_no: (parent) => parent.booking_no,
    no_of_guest: (parent) => parent.guests ? parent.guests.length : 0,
    amount_paid: (parent) => parent.amount_paid,
    valid_payment: (parent) => parent.vaild_payment_details,
    contract_signature: (parent) => parent.contract_signature,
    checkin_date: (parent) => parent.checkin_date,
    checkout_date: (parent) => parent.checkout_date,

    already_checkedin: (parent) => parent.checkedin_at === null || typeof parent.checkedin_at === "undefined" ? false : true,
    checkedin_at: (parent) => parent.checkedin_at, 
    
    approved: (parent) => parent.approved_at === null || typeof parent.approved_at === "undefined" ? false : true,
    approved_at: (parent) => parent.approved_at,
    
    instruction: (parent) => parent.instruction,
    checkin_url: (parent) => `${config.app.url}/r/${parent.id}`,
    property_id: (parent) => parent.property_id,
    property: (parent) => parent.property,
    guests: (parent) => parent.guests,
};

module.exports =  reservation;