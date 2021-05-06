
const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);

const cancelStripeSubscription = async (subscription_id, stripe_account = undefined) => {

    const subscription = await stripe.subscriptions.del(subscription_id,
      {
        stripeAccount: stripe_account
      }
    );
    
    return subscription;
}

module.exports = cancelStripeSubscription;




