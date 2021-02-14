const config = require('../../../../config');
const Stripe = require('stripe');
const stripe = Stripe(config.stripe.test.secretKey);

const getStripeFile = async (parent, { id }, context) => await stripe.files.retrieve(id);

module.exports = getStripeFile;