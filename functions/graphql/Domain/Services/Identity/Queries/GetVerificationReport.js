const config = require('../../../../../config');

const Stripe = require('stripe');
const stripe = Stripe(config.stripe.test.secretKey, {
  apiVersion: '2020-08-27; identity_beta=v4'
});

const getVerificationReport = async (parent, {id}, context) => {
    const resource = Stripe.Stripe.StripeResource.extend({
        request: Stripe.Stripe.StripeResource.method({
          method: 'GET',
          path: `/identity/verification_reports/${id}`,
        })
      });
      
      const verificationReport = await new resource(stripe).request({
        expand: [],
      });

      return verificationReport;
}

module.exports = getVerificationReport;
