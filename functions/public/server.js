/**
 * Public htdocs server
 */

const fs = require('fs');
const express = require('express');

module.exports = () => {
  const app = express();

  app.get('*', (req, res) => {
    const path = `${__dirname}/htdocs${req.path}`;
  
      fs.access(path, fs.F_OK, (err) => {
      if (err) {
        res.status(404).send('Not Found');
      }
      res.status(200).sendFile(path);
    });
  });
  return app;
};
