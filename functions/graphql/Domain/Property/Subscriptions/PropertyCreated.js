
const sub = require('../../../App/Providers/pubsub');
const subscriptions = require('../Enums/subscriptions');

const propertyCreated = {
    subscribe: () => sub.asyncIterator([subscriptions.create]),
};

module.exports = propertyCreated;