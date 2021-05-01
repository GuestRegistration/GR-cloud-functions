const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);
const captureStripeCharge = async ({ charge_id, amount }, stripe_account = undefined ) => {
    
  const charge = await stripe.charges.capture( charge_id,
      {
        amount
      },
      {
        stripeAccount: stripe_account
      }
    );
      return charge;
}

module.exports = captureStripeCharge;




