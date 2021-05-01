const config = require('../../../../../config');

const Stripe = require('stripe');
const stripe = Stripe(config.stripe.secretKey, {
  apiVersion: '2020-08-27; identity_beta=v4'
});

const getStripeVerificationSession = async ({id}, stripe_account = undefined) => {
    const resource = Stripe.Stripe.StripeResource.extend({
        request: Stripe.Stripe.StripeResource.method({
          method: 'GET',
          path: `/identity/verification_sessions/${id}`,
        })
      });
      
      const verificationSession = await new resource(stripe).request({
        expand: ['last_verification_report'],
      },
      // ,
      // {
      //     stripeAccount: stripe_account
      // }
      );

      return verificationSession;
}

module.exports = getStripeVerificationSession;
