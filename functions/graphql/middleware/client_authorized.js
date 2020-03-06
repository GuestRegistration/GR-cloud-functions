
/**
 * This middleware check from the context if the client token is valid
 */

const ClientNotAuthorizedError = require('../error/ClientNotAuthorized')

module.exports = (context) => {
    if(!context.auth.client_token_valid){
        throw new ClientNotAuthorizedError
    }
}