const createStripeCharge = require('../Actions/CreateStripeCharge');

const createCharge = async (parent, {stripe_account, source, amount, currency, description, receipt_email, metadata, capture }, context) => {

  return await createStripeCharge({ source, amount, currency, description, receipt_email, metadata, capture }, stripe_account)

}

module.exports = createCharge;




