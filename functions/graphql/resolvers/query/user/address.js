const address = {
    street: (parent) => parent.street,
    city: (parent) => parent.city,
    state: (parent) => parent.state,
    country: (parent) => parent.city,
    postal_code: (parent) => parent.postal_code
}

module.exports = address