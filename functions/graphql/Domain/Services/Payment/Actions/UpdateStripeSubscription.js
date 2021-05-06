
const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);

const updateStripeSubscription = async ( subscription_id, { default_source, cancel_at_period_end }, stripe_account = undefined) => {
    
    
    const subscription = await stripe.subscriptions.update(subscription_id, 
      {
        default_source,
        cancel_at_period_end
      },
      {
        stripeAccount: stripe_account
      }
    );
    
    return subscription;
}

module.exports = updateStripeSubscription;




