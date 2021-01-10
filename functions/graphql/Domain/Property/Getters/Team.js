const team = {
    user_id: (parent) => parent.user_id,
    name: (parent) => parent.name,
    email: (parent) => parent.email,
    role: (parent) => parent.role
};

module.exports = team;