module.exports = {
    mainStripeIdentityWebhook: require('../stripe/webhooks/main/webhook-identity'),
    mainStripePaymentWebhook: require('../stripe/webhooks/main/webhook-payment'),
    mainStripeConnectWebhook: require('../stripe/webhooks/main/webhook-connect'),
    
    connectedStripeIdentityWebhook: require('../stripe/webhooks/connected/webhook-identity'),
    connectedStripePaymentWebhook: require('../stripe/webhooks/connected/webhook-payment'),
    connectedStripeConnectWebhook: require('../stripe/webhooks/connected/webhook-connect'),
}