const createdStripeVerificationSession = require('../Actions/createStripeVerificationSession');

const createVerificationSession = async (parent, { stripe_account, metadata, return_url, refresh_url }, context) => {
    return await createdStripeVerificationSession( {stripe_account, metadata, return_url, refresh_url } )
}

module.exports = createVerificationSession;
