
const sub = require('../../../pubsub')

const tokenChanged = {
    subscribe: () => sub.pubsub.asyncIterator([sub.subscriptions.auth.token_cange]),
  }

module.exports = tokenChanged