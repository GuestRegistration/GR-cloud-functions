const express = require('express');
const stripeWebhooks = require('./webhooks');
const config = require('../../config');

const router = express.Router();

// Webhoook routes for main account
router.post(config.stripe.webhooks.main.identity.endpoint, stripeWebhooks.mainStripeIdentityWebhook);
router.post(config.stripe.webhooks.main.payment.endpoint, stripeWebhooks.mainStripePaymentWebhook);

// Webhook routes for connected account
router.post(config.stripe.webhooks.connected.identity.endpoint, stripeWebhooks.connectedStripeIdentityWebhook);
router.post(config.stripe.webhooks.connected.connect.endpoint, stripeWebhooks.connectedStripeConnectWebhook);
router.post(config.stripe.webhooks.connected.payment.endpoint, stripeWebhooks.connectedStripePaymentWebhook);

module.exports = router;