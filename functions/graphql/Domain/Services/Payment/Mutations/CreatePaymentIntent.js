
const createStripePaymentIntent = require('../Actions/CreateStripePaymentIntent');

const createPaymentIntent = async (parent, {stripe_account, amount, currency, payment_method_types, metadata }, context) => {

      return createStripePaymentIntent({ stripe_account, amount, currency, payment_method_types, metadata });
}

module.exports = createPaymentIntent;




