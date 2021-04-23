const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);
const createStripeRefund = async ({stripe_account, charge_id, amount, reason, customer_note }) => {
    
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
        expand: ['charge'],
        stripeAccount: stripe_account
      }
    );
      return refund;
}

module.exports = createStripeRefund;




