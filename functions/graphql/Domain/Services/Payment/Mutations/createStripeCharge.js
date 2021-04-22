const config = require('../../../../../config');
const helper = require('../../../../../helpers');

const stripe = require('stripe')(config.stripe.secretKey);
const createStripeCharge = async (parent, {stripe_account, source, amount, currency, description, receipt_email, metadata, capture }, context) => {
    
  const data = {
    source, amount, currency, description, metadata, capture
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




