const property = {
    id: (parent) => parent.id,
    user_id: (parent) => parent.user_id,
    name: (parent) => parent.name,
    phone: (parent) => parent.phone,
    phone_meta: (parent) => parent.phone_meta,
    email: (parent) => parent.email,
    full_address: (parent) => parent.full_address,
    address: (parent) => parent.address,
    image: (parent) => parent.image,
    terms: (parent) => parent.terms,
    rules: (parent) => parent.rules,
    team: (parent) => parent.team,
    reservations: (parent) => parent.reservations,
    active: (parent) => parent.subscription && (parent.subscription.status === 'active' || parent.subscription.status === 'trialing')
};

module.exports = property;