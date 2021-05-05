/**
 * GraphQL server
 */

const http = require('http');
const cors = require("cors");
const express = require("express");
const jwt = require('jsonwebtoken');
const { ApolloServer } = require("apollo-server-express");

const config = require('../config');
const firebaseAdmin = require('./../admin');
const typeDefs = require('./App/Providers/schemas');
const resolvers = require('./App/Providers/resolvers');
const clients = require('./Domain/Auth/Enums/clients');
const PORT = 5000;

const graphQLServer = () => {

    // invoke express to create our server
    const app = express();
    //use the cors middleware
    app.use(cors());

    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        subscriptions: {
            onConnect: (connectionParams, webSocket, context) => {
                console.log("connected to websocket");
              },
            onOperation: (message, params, webSocket) => {
                console.log("on operation");
              },
              onOperationComplete: webSocket => {
                console.log("on operation complete");
              },
              onDisconnect: (webSocket, context) => {
                console.log("disconnected from websocket");
              },
          },
        introspection: true,
        playground: true,
        context:  async ({ req, connection }) => {
            
            if(connection){ //if it is over websocket i.e subscription
                return connection.context;
            }else{
                 // initialize the context
                const auth = {
                    client_token: null,
                    client_token_valid: false,
                    user_token: null,
                    user_token_valid: false,
                    user_uid: null,
                    test_user: req.headers['gr-test-user'] || null,
                };
                // retrieve the client and user token from the header
                const clientAuthorization = req.headers['gr-client-token'] || null;
                const userAuthorization = req.headers['gr-user-token'] || null;

                // first verify the client
                if(clientAuthorization === null) return {auth};

                try{
                    auth.client_token = clientAuthorization.split('Bearer ')[1];
                    const decoded = jwt.verify(auth.client_token, config.jwt.signature);
                    
                    if(clients.find((c) => c.email === decoded.email && c.password === decoded.password)){
                        auth.client_token_valid = true;
                    }   
                }
                // catch the error incase the token is malformed
                catch(e){
                    auth.client_token_valid = false;
                }

                // check for user header
                if(userAuthorization === null) return {auth};

                    try{
                        auth.user_token = userAuthorization.split('Bearer ')[1];
                        /**
                         * verify the user idToken
                         */
                        const decodedToken = await firebaseAdmin.auth().verifyIdToken(auth.user_token);
                        
                        if(decodedToken.uid){
                            auth.user_token_valid  = true;
                            auth.user_uid  = decodedToken.uid;
                        }
                        return {auth};
                    }
                    catch(e){
                        return {auth};
                    }
                }   
            }
    });

    // now we take our newly instantiated ApolloServer and apply the previously configured express application
    server.applyMiddleware({app, path: '/', cors: true});

    //create a http server
    const subscriptionServer = http.createServer(app);
    // install the subscription handler on the http server
    server.installSubscriptionHandlers(subscriptionServer);

    // subscriptionServer.listen(PORT, () => {
    //     console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    //     console.log(`🚀 Subscriptions ready at  ws://localhost:${PORT}${server.subscriptionsPath}`);
    // });

    // finally return the application
    return app;
};

module.exports = graphQLServer;