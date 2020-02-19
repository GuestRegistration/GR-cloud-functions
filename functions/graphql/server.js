// require all dependencies to set up server
const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

// cors allows our server to accept requests from different origins
const cors = require("cors");

function configureServer() {
    // invoke express to create our server
    const app = express();
    //use the cors middleware
    app.use(cors());

    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        introspection: true,
        playground: true,
    });
    // now we take our newly instantiated ApolloServer and apply the   // previously configured express application
    server.applyMiddleware({app, path: '/', cors: true});
    // finally return the application
    return app;
}
module.exports = configureServer;