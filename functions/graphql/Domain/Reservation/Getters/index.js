
const config = require('../../../../config');
const reservation = {
    no_of_guest: (parent) => parent.guests ? parent.guests.length : 0,
    already_checkedin: (parent) => parent.checkedin_at === null || typeof parent.checkedin_at === "undefined" ? false : true,
    approved: (parent) => parent.approved_at === null || typeof parent.approved_at === "undefined" ? false : true,
    checkin_url: (parent) => `${config.app.url}/r/${parent.id}`,
};

module.exports =  reservation;