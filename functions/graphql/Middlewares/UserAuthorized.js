
/**
 * This middleware check if the authenticated user can perform the query or mutation
 */
const config = require('../../config');
const userAuthenticated = require('./UserAuthenticated');
const UserNotAuthorizedException = require('../Exceptions/UserNotAuthorizedException');

module.exports = (context, permitted = []) => {
    if(config.middleware){
        // first apply the authentication middleware
        const auth =  userAuthenticated(context);
        if(auth){
            // Now check if the user has permission 
            if(auth === null || !permitted.includes(auth)){
                throw new UserNotAuthorizedException();
            }
        }
    }
};