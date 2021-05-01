const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);
const getStripeCharge = async (id, stripe_account = undefined) => {
    
  const charge = await stripe.charges.retrieve(id,
      {
        stripeAccount: stripe_account
      }
    ); 
      return charge;
}

module.exports = getStripeCharge;




