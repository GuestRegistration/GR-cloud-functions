const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);

const getStripeAccount = async (id) => {
    const account = await stripe.accounts.retrieve(id); 
    return account;
}

module.exports = getStripeAccount;




