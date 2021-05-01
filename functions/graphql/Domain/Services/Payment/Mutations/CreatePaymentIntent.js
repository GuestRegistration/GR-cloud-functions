
const createStripePaymentIntent = require('../Actions/CreateStripePaymentIntent');

const createPaymentIntent = async (parent, {stripe_account, amount, currency, payment_method_types, metadata }, context) => {

      return createStripePaymentIntent({ amount, currency, payment_method_types, metadata }, stripe_account);
}

module.exports = createPaymentIntent;




