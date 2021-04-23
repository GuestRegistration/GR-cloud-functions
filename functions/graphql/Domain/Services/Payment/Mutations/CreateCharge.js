const createStripeCharge = require('../Actions/CreateStripeCharge');

const createCharge = async (parent, {stripe_account, source, amount, currency, description, receipt_email, metadata, capture }, context) => {

  return await createStripeCharge({stripe_account, source, amount, currency, description, receipt_email, metadata, capture })

}

module.exports = createCharge;




