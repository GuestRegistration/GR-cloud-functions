
const sub = require('../../../App/Providers/pubsub');

const tokenChanged =  {
    subscribe: () => sub.asyncIterator(['TOKEN_CREATED']),
};

module.exports = tokenChanged;
