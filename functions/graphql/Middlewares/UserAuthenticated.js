
/**
 * 
 */

const UserNotAuthenticatedException = require('../Exceptions/UserNotAuthenticatedException');

/**
 * This middleware check from the context if the user token is valid and then return the authenticated user ID
 */
module.exports = (context) => {    
    if(!context.auth.user_token_valid){
        if(context.auth.test_user) return context.auth.test_user;
        throw new UserNotAuthenticatedException();
    }else{
        return context.auth.user_uid;
    }
};