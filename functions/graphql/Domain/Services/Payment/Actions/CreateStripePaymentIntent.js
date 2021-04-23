const config = require('../../../../../config');

const stripe = require('stripe')(config.stripe.secretKey);
const createStripePaymentIntent = async ({stripe_account, amount, currency, payment_method_types, metadata }) => {
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




