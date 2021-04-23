const captureStripeCharge = require('../Actions/CaptureStripeCharge');

const captureCharge = async (parent, {stripe_account, charge_id, amount }, context) => {

  return await captureStripeCharge({stripe_account, charge_id, amount })

}

module.exports = captureCharge;




