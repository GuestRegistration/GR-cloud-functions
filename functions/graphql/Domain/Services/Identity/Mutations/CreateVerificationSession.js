const createdStripeVerificationSession = require('../Actions/createStripeVerificationSession');

const createVerificationSession = async (parent, { stripe_account, metadata, return_url, refresh_url }, context) => {
    return await createdStripeVerificationSession( { metadata, return_url, refresh_url }, stripe_account )
}

module.exports = createVerificationSession;
