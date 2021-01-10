
const sub = require('../../../App/Providers/pubsub');
const subscriptions = require('../Enums/subscriptions');

const reservationCreated = {
    subscribe: () => sub.asyncIterator([subscriptions.create]),
};

module.exports = reservationCreated;