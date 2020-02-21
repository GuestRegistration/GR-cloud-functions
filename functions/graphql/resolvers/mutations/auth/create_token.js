
/**
 * Create a JWT token
 */
const jwt = require('jsonwebtoken')
const clients = require('./../../../data/clients')

const createToken = async (parent, {email, password}) => {
    const client = clients.find((c) => c.email === email && c.password === password)
    if(client){
        const signature = require('./../../../../key/jwt-key')
        return {
            email: client.email,
            token: jwt.sign({email, password}, signature)
        }
    } 
    return null
}

module.exports = createToken
