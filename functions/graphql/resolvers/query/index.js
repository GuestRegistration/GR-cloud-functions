const tests = require('../../data/tests')
const users = require('../../data/users')

const query = {
    tests: () => tests,
    root: () => "Hello, this is the root",
    users: () => users,
    user: (parent, args) =>  users.find( user => user.id === args.id)
}

module.exports = query
