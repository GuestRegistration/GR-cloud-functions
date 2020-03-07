
/**
 * This middleware check from the context if the user token is valid
 */

const config = require('./../config')
const UserNotAuthenticatedError = require('../error/UserNotAuthenticated')
module.exports = (context) => {

    if(config.middleware){
        if(!context.auth.user_token_valid){
            throw new UserNotAuthenticatedError
        }else{
            return context.auth.user_uid
        }
    }
    return config.test_user.id
}