const property = {
    id: (parent) => parent.id,
    user_id: (parent) => parent.user_id,
    name: (parent) => parent.name,
    phone: (parent) => parent.phone,
    phone_meta: (parent) => parent.phone_meta,
    email: (parent) => parent.email,
    address: (parent) => parent.address,
    image: (parent) => parent.image ? parent.image : 'https://res.cloudinary.com/adedayomatt/image/upload/v1607575119/Virtual%20Tribe/1602792209093.jpg',
    terms: (parent) => parent.terms,
    rules: (parent) => parent.rules,
    team: (parent) => parent.team,
    reservations: (parent) => parent.reservations
};

module.exports = property;