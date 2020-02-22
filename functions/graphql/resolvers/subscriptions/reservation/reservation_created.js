
const sub = require('../../../pubsub')

const reservationCreated = {
    subscribe: () => sub.pubsub.asyncIterator([sub.subscriptions.reservation.create]),
  }

module.exports = reservationCreated