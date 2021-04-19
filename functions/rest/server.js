/**
 * REST API server
 */
const express = require('express');
const cors = require('cors');
const stripeWebhooks = require('./controllers/stripeWebhooks');
const config = require('../config');

module.exports = () => {
  const app = express();
  app.use(cors());

  app.get('/', (req, res) => {
    res.send({
      message: "Hello world"
    });
  });

  // Webhoook routes for main account
  app.post(config.stripe.webhooks.main.identity.endpoint, stripeWebhooks.mainStripeIdentityWebhook);
  app.post(config.stripe.webhooks.main.payment.endpoint, stripeWebhooks.mainStripePaymentWebhook);

  // Webhook routes for connected account
  app.post(config.stripe.webhooks.connected.identity.endpoint, stripeWebhooks.connectedStripeIdentityWebhook);
  app.post(config.stripe.webhooks.connected.connect.endpoint, stripeWebhooks.connectedStripeConnectWebhook);
  app.post(config.stripe.webhooks.connected.payment.endpoint, stripeWebhooks.connectedStripePaymentWebhook);

  return app;
};
