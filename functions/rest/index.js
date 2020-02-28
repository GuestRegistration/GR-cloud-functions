const express = require("express")
const cors = require("cors");
const configureServer = require("./../graphql/server")

/* Express with CORS */
const app = express()
app.use(cors({ origin: true }))
app.get("/", (request, response) => {
  response.send("Hello from Express on Firebase with CORS!")
})
app.get('/graphql', configureServer())

module.exports = app