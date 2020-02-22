
const sub = require('../../../pubsub')

const propertyUpdated = {
    subscribe: () => sub.pubsub.asyncIterator([sub.subscriptions.property.update]),
  }

module.exports = propertyUpdated