const getStripeVerificationReport = require('../Actions/GetStripeVerificationReport');

const getVerificationReport = async (parent, {id}, context) => {
    return await getStripeVerificationReport({id})
}

module.exports = getVerificationReport;
