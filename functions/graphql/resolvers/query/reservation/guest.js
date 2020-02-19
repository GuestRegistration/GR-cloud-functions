
const guest = {
    user_id: (parent) => parent.user_id,
    name: (parent) => parent.name,
    guest_type: (parent) => parent.guest_type
}

module.exports = guest