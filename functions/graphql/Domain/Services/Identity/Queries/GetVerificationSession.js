const config = require('../../../../../config');

const Stripe = require('stripe');
const stripe = Stripe(config.stripe.test.secretKey, {
  apiVersion: '2020-08-27; identity_beta=v4'
});

const getVerificationSession = async (parent, {id}, context) => {
    const resource = Stripe.Stripe.StripeResource.extend({
        request: Stripe.Stripe.StripeResource.method({
          method: 'GET',
          path: `/identity/verification_sessions/${id}`,
        })
      });
      
      const verificationSession = await new resource(stripe).request({
        expand: ['last_verification_report'],
      });

      return verificationSession;
}

module.exports = getVerificationSession;
