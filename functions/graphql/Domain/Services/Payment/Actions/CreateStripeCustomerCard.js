const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);

const createStripeCustomerCard = async ({ customer_id, source }, stripe_account = undefined) => {

  const card = await stripe.customers.createSource( customer_id, {source},
      {
        stripeAccount: stripe_account
      }
    );
    
    return card;
}

module.exports = createStripeCustomerCard;




