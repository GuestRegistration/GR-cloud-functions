const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);

const getStripeCustomer = async ( customer_id, stripe_account = undefined) => {
    
  const customer = await stripe.customers.retrieve( customer_id,
      {
        stripeAccount: stripe_account
      }
    );
      return customer;
}

module.exports = getStripeCustomer;




