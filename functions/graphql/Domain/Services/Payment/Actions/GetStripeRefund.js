const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);
const getStripeRefund = async (id, stripe_account = undefined) => {
    
  const refund = await stripe.refunds.retrieve(id,
      {
        expand: ['charge'],
        stripeAccount: stripe_account
      }
    ); 
      return refund;
}

module.exports = getStripeRefund;




