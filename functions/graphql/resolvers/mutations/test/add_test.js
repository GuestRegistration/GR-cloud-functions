
const tests = require('../../../data/tests')

const addTest = (parent, args) => {
    const test = {param1: args.param1, param2: args.param2}
    tests.push(test)
    return test
}

module.exports = addTest;