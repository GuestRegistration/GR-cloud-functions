const getStripeVerificationSession = require('../Actions/GetStripeVerificationSession');

const getVerificationSession = async (parent, {id}, context) => {
    return await getStripeVerificationSession({id})
}

module.exports = getVerificationSession;
