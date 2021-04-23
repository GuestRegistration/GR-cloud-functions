/**
 * create user stripe verification
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const UserAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const createVerificationSession = require('../../Services/Identity/Actions/CreateStripeVerificationSession')   

const createUserStripeVerificationSession = async (parent, { stripe_account, metadata, return_url, refresh_url }, context) => {
    clientAuthorizedMiddleware(context);
    UserAuthenticatedMiddleware(context);

    const session = await createVerificationSession({ stripe_account, metadata, return_url, refresh_url })

    return session;

};

module.exports = createUserStripeVerificationSession;