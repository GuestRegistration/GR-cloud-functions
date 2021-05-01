const captureStripeCharge = require('../Actions/CaptureStripeCharge');

const captureCharge = async (parent, {stripe_account, charge_id, amount }, context) => {

  return await captureStripeCharge({ charge_id, amount }, stripe_account)

}

module.exports = captureCharge;




