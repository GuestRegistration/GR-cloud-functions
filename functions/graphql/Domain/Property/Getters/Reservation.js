const reservation = {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    checkin_date: (parent) => parent.checkin_date,
    checkout_date: (parent) => parent.checkout_date
};

module.exports = reservation;