const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);
const captureStripeCharge = async (parent, {stripe_account, charge_id, amount }, context) => {
    
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




