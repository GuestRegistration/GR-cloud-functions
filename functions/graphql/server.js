// require all dependencies to set up server
const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const admin = require('./../admin')
const jwt = require('jsonwebtoken')
const clients = require('./data/clients')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
// cors allows our server to accept requests from different origins
const cors = require("cors");

function configureServer() {
    // invoke express to create our server
    const app = express();
    //use the cors middleware
    app.use(cors());
    // verify the client first
    // app.use((req, res, next) => {
    //     const client_authorization = req.headers['gr-client-token'] || null
    //     if(client_authorization === null){
    //         res.status(401).send("No valid client token")
    //     }
    //     next();
    // })

    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        introspection: true,
        playground: true,
        context:  async ({ req }) => {
            // retrive the user idToken from the header
            const auth = {
                client_token: null,
                client_token_valid: false,
                user_token: null,
                user_token_valid: false,
                user_uid: null,
            }
            // retrieve the client and user token from the header
            const client_authorization = req.headers['gr-client-token'] || null
            const user_authorization = req.headers['gr-user-token'] || null

            // first authenticate the client
            if(client_authorization === null) return {auth}

            const client_token = client_authorization.split('Bearer ')[1]
            const signature = require('./../key/jwt-key')
            const decoded = jwt.verify(client_token, signature);
            auth.client_token = client_token

            if(clients.find((c) => c.email === decoded.email && c.password === decoded.password)){
                auth.client_token_valid = true
            }   

            if(user_authorization === null) return {auth}
            try{
               const user_token = user_authorization.split('Bearer ')[1]
               auth.user_token = user_token

                /**
                 * verify the user idToken
                 */
                
                // const decodedToken = await admin.auth().verifyIdToken(user_token)
                if(decodedToken.uid){
                    // auth.user_token_valid  = true
                    // auth.user_uid  = decodedToken.uid
                }
                return {auth}
             }
             catch(e){
                return {auth}
            }
          }
    });
    // now we take our newly instantiated ApolloServer and apply the 
// previously configured express application
    server.applyMiddleware({app, path: '/', cors: true});
    // finally return the application
    return app;
}
module.exports = configureServer;