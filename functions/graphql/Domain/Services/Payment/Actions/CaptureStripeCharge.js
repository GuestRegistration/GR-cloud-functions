const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);
const captureStripeCharge = async ({stripe_account, charge_id, amount }) => {
    
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




