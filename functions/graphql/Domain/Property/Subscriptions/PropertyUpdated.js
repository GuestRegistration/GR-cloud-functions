
const sub = require('../../../App/Providers/pubsub');
const subscriptions = require('../Enums/subscriptions');

const propertyUpdated = {
    subscribe: () => sub.asyncIterator([subscriptions.update]),
};

module.exports = propertyUpdated;