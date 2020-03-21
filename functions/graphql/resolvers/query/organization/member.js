const member = {
    user_id: (parent) => parent.user_id,
    name: (parent) => parent.name,
    role: (parent) => parent.role,
    is_owner: (parent) => parent.role === 'owner' ? true : false,
    is_host: (parent) => parent.role === 'host' ? true : false,
}

module.exports = member;