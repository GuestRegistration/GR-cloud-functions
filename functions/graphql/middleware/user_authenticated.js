
/**
 * This middleware check from the context if the user token is valid
 */

const config = require('./../config')
const UserNotAuthenticatedError = require('../error/UserNotAuthenticated')
module.exports = (context) => {    
    if(!context.auth.user_token_valid){
        if(context.auth.test_user) return context.auth.test_user;
        throw new UserNotAuthenticatedError
    }else{
        return context.auth.user_uid
    }
}