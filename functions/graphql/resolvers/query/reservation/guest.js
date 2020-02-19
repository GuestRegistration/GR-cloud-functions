
const guest = {
    user_id: (parent) => parent.user_id,
    name: (parent) => parent.name,
    gender: (parent) => parent.gender,
    type: (parent) => parent.type
}

module.exports = guest