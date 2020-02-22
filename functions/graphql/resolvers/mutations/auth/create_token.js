
/**
 * Create a JWT token
 */
const jwt = require('jsonwebtoken')
const clients = require('./../../../data/clients')
const sub = require('./../../../pubsub');

const createToken = async (parent, {email, password}) => {
    const client = clients.find((c) => c.email === email && c.password === password)
    if(client){
        const signature = require('./../../../../key/jwt-key')
        const token = {
                    email: client.email,
                    token: jwt.sign({email, password}, signature)
                }
                
        // sub.pubsub.publish(sub.subscriptions.auth.token_change, token)
        return token
    } 
    return null
}

module.exports = createToken
