/**
 * REST API server
 */
const express = require('express');
const cors = require('cors');
const { stripeIdentityWebhook, stripeConnectWebhook, stripePaymentWebhook } = require('./controllers');
const config = require('../config');

module.exports = () => {
  const app = express();
  app.use(cors());

  app.get('/', (req, res) => {
    res.send({
      message: "Hello world"
    });
  });

  app.post(config.stripe.webhooks.identity.endpoint, stripeIdentityWebhook);
  app.post(config.stripe.webhooks.connect.endpoint, stripeConnectWebhook);
  app.post(config.stripe.webhooks.payment.endpoint, stripePaymentWebhook);

  return app;
};
