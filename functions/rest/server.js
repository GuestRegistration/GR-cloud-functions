/**
 * REST API server
 */
const express = require('express');
const cors = require('cors');
const { stripeWebhook } = require('./controllers');

module.exports = () => {
  const app = express();
  app.use(cors());

  app.get('/', (req, res) => {
    res.send({
      message: "Hello world"
    });
  });

  app.post('/webhook/stripe', stripeWebhook);

  return app;
};
