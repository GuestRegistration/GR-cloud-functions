
const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);

const createStripeSubscription = async ({ customer_id, price_id, credit_card_id, metadata, trial_period_days }, stripe_account = undefined) => {
    
    const data = { 
      customer: customer_id, 
      items: [{
        price: price_id
      }], 
      metadata, 
      default_source: credit_card_id,
      trial_period_days, 
      trial_from_plan: trial_period_days <= 0 ? false : true 
    }

    const subscription = await stripe.subscriptions.create(data,
      {
        stripeAccount: stripe_account
      }
    );
    
    return subscription;
}

module.exports = createStripeSubscription;




