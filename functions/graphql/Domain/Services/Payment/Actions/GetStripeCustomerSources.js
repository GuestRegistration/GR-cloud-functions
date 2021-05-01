const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);

const getStripeCustomerSources = async ({ customer_id }, stripe_account = undefined) => {
    
  const sources = await stripe.customers.listSources( customer_id,
      {
        stripeAccount: stripe_account
      }
    );
    
    return sources;
}

module.exports = getStripeCustomerSources;




