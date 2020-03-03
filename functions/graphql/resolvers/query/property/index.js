const property = {
    id: (parent) => parent.id,
    user_id: (parent) => parent.user_id,
    name: (parent) => parent.name,
    phone: (parent) => parent.phone,
    email: (parent) => parent.email,
    address: (parent) => parent.address,
    image: (parent) => parent.image,
    terms: (parent) => parent.terms,
    rules: (parent) => parent.rules,
    team: (parent) => parent.team,
    reservations: (parent) => parent.reservations
}

module.exports = property