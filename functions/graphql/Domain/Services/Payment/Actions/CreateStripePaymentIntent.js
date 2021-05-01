const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);
const createStripePaymentIntent = async ({ amount, currency, payment_method_types, metadata }, stripe_account = undefined) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types,
        metadata
      }
      ,
      {
        stripeAccount: stripe_account
      }
      );

      return paymentIntent;
}

module.exports = createStripePaymentIntent;




