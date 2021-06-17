/**
 * REST API server
 */
const express = require('express');
const cors = require('cors');
const stripeWebhook = require('./stripe/routes');
const zappier = require('./zappier/routes');

module.exports = () => {
  const app = express();
  app.use(cors());

  app.get('/', (req, res) => {
    res.send({
      message: "Hello world"
    });
  });

  app.use('/stripe', stripeWebhook);
  app.use('/zapier', zappier);

  return app;
};
