
/**
 * Create a JWT token
 */

const jwt = require('jsonwebtoken');
const clients = require('../Enums/clients');
const sub = require('../../../App/Providers/pubsub');
const config = require('../../../../config');

const createToken = (parent, {email, password}) => {
    const client = clients.find((c) => c.email === email && c.password === password);
    if(client){
        const token = {
                    email: client.email,
                    token: jwt.sign({email, password}, config.jwt.signature)
                };
        sub.publish('TOKEN_CREATED', {
            tokenChanged: token
        });
        return token;
    } 
    return null;
};

module.exports = createToken;
