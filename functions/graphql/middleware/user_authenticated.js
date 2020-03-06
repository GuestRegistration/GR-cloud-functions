
/**
 * This middleware check from the context if the user token is valid
 */

const UserNotAuthenticatedError = require('../error/UserNotAuthenticated')
module.exports = (context) => {
    if(!context.auth.user_token_valid){
        throw new UserNotAuthenticatedError
    }else{
        return context.auth.user_uid
    }
}