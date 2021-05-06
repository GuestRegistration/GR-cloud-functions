const config = require('../../../../config');
const getStripePlan = require('../../Services/Payment/Actions/GetStripePlan');


const getPlan = async (parent, args, context) => {

    return  await getStripePlan(config.stripe.subscription.price_id)
}

module.exports = getPlan;