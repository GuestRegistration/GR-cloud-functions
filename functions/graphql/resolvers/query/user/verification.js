const verification = {
    type: (parent) => parent.type,
    name: (parent) => parent.name,
    country: (parent) => parent.country,
    state: (parent) => parent.state,
    exp_date: (parent) => parent.exp_date,
    date_of_birth: (parent) => parent.date_of_birth,
    issue_date: (parent) => parent.issue_date
}

module.exports = verification