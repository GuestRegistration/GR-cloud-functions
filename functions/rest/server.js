/**
 * REST API server
 */

const express = require('express');
const cors = require('cors');

module.exports = () => {
  const app = express();
  app.use(cors());

  app.get('/', (req, res) => {
    res.send({
      message: "Hello world"
    });
  });

  return app;
};
