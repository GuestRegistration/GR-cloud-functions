const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);

const getStripeSubscription = async ( subscription_id, stripe_account = undefined) => {
    
  const subscription = await stripe.subscriptions.retrieve( subscription_id,
      {
        stripeAccount: stripe_account
      }
    );
    return subscription;
}

module.exports = getStripeSubscription;




