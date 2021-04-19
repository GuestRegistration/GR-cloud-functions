module.exports = {
    stripeIdentityWebhook: require('../stripe/webhook-identity'),
    stripeConnectWebhook: require('../stripe/webhook-connect'),
    stripePaymentWebhook: require('../stripe/webhook-payment')
}