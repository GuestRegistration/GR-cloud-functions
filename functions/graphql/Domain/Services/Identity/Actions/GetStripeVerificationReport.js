const config = require('../../../../../config');

const Stripe = require('stripe');
const stripe = Stripe(config.stripe.secretKey, {
  apiVersion: '2020-08-27; identity_beta=v4'
});

const getStripeVerificationReport = async ({ id }) => {

      const resource = Stripe.Stripe.StripeResource.extend({
        request: Stripe.Stripe.StripeResource.method({
          method: 'GET',
          path: `/identity/verification_reports/${id}`,
        })
      });

      const report = await new resource(stripe).request({
        expand: [],
      })

      const files = [{
        name: 'document_front',
        id: report.document.front
      },
      {
        name: 'document_back',
        id: report.document.back
      },
      {
        name: 'selfie',
        id: report.selfie.selfie
      }];

      const retrivedFiles = await Promise.all(files.map(file => file.id ? stripe.files.retrieve(file.id) : Promise.resolve(null)))
        
        const firestoreFiles = {};
        retrivedFiles.forEach((file, i) => {
          firestoreFiles[files[i].name] = file
        })

        return {
          ...report,
          files: firestoreFiles
        }
}

module.exports = getStripeVerificationReport;
