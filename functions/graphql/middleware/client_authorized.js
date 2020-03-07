
/**
 * This middleware check from the context if the client token is valid
 */
const config = require('./../config')
const ClientNotAuthorizedError = require('./../error/ClientNotAuthorized')

module.exports = (context) => {
    if(config.middleware){
        if(!context.auth.client_token_valid){
            throw new ClientNotAuthorizedError
        }
    }
}