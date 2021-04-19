const reservation = {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    property_id: (parent) => parent.property_id,
    property_name: (parent) => parent.property_name,
    property_address: (parent) => parent.property_address,
    property_image: (parent) => parent.property_image,
    checkin_date: (parent) => parent.checkin_date,
    checkout_date: (parent) => parent.checkout_date,
    role: (parent) => parent.reservation_role
};

module.exports = reservation;
