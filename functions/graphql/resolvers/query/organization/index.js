const organization = {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    members: (parent) => parent.members,
    token: (parent) => parent.token,
}

module.exports = organization;