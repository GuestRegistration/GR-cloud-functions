
const sub = require('../../../pubsub')

const reservationUpdated = {
    subscribe: () => sub.pubsub.asyncIterator([sub.subscriptions.reservation.update]),
  }

module.exports = reservationUpdated