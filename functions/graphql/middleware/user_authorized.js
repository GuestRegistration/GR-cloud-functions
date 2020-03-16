
/**
 * This middleware check if the authenticated user can perform the query or mutation
 */
const config = require('./../config')
const auth_middleware = require('../middleware/user_authenticated')
const UserNotAuthorizedError = require('../error/UserNotAuthorized')
module.exports = (context, permitted = []) => {
    if(config.middleware){
        // first apply the authentication middleware
        const auth =  auth_middleware(context)

        if(auth){
            // Now check if the user has permission 
            if(auth === null || !permitted.includes(auth)){
                throw new UserNotAuthorizedError
            }
        }
    }
}