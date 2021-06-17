module.exports = {
    mainStripeIdentityWebhook: require('./main/webhook-identity'),
    mainStripePaymentWebhook: require('./main/webhook-payment'),
    mainStripeConnectWebhook: require('./main/webhook-connect'),
    
    connectedStripeIdentityWebhook: require('./connected/webhook-identity'),
    connectedStripePaymentWebhook: require('./connected/webhook-payment'),
    connectedStripeConnectWebhook: require('./connected/webhook-connect'),
}