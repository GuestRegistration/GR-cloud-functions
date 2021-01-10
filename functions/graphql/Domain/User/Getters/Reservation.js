const reservation = {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    property_id: (parent) => parent.property_id,
    property_name: (parent) => parent.property_name,
    property_city: (parent) => parent.property_city,
    property_country: (parent) => parent.property_country,
    property_image: (parent) => parent.property_image ? parent.property_image : 'https://res.cloudinary.com/adedayomatt/image/upload/v1607575119/Virtual%20Tribe/1602792209093.jpg',
    checkin_date: (parent) => parent.checkin_date,
    checkout_date: (parent) => parent.checkout_date,
    role: (parent) => parent.reservation_role
};

module.exports = reservation;