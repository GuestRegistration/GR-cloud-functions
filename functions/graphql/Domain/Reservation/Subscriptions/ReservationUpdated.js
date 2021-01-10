
const sub = require('../../../App/Providers/pubsub');
const subscriptions = require('../Enums/subscriptions');

const reservationUpdated = {
    subscribe: () => sub.asyncIterator([subscriptions.update]),
};

module.exports = reservationUpdated;