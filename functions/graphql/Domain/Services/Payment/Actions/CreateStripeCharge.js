const config = require('../../../../../config');
const helper = require('../../../../../helpers');

const stripe = require('stripe')(config.stripe.secretKey);

const createStripeCharge = async ({ source, customer, amount, currency, description, receipt_email, metadata, capture }, stripe_account = undefined) => {
    
  const data = {
    source, customer, amount, currency, description, metadata, capture
  }
  if(receipt_email && helper.validateEmail(receipt_email)){
    data.receipt_email = receipt_email
  }

  const charge = await stripe.charges.create( data,
      {
        stripeAccount: stripe_account
      }
    );
      return charge;
}

module.exports = createStripeCharge;




