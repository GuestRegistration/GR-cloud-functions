const fs = require('fs');
const express = require("express");
const server = express();

server.get('*', (req, res) => {
  const path = `${__dirname}/htdocs${req.path}`;

    fs.access(path, fs.F_OK, (err) => {
    if (err) {
      res.status(404).send('Not Found');
    }
    res.status(200).sendFile(path);
  });
});

module.exports = server;