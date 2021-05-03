const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);

const deleteStripeCustomerCard = async ({ customer_id, card_id }, stripe_account = undefined) => {

  const card = await stripe.customers.createSource( customer_id, card_id,
      {
        stripeAccount: stripe_account
      }
    );
    
    return card;
}

module.exports = deleteStripeCustomerCard;




