const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);
const createStripeRefund = async ({ charge_id, amount, reason, customer_note }, stripe_account = undefined) => {
    
  const refund = await stripe.refunds.create( 
      {
        charge: charge_id,
        amount,
        reason,
        metadata: {
          customer_note
        }
      },
      {
        stripeAccount: stripe_account
      }
    ); 
      return refund;
}

module.exports = createStripeRefund;




