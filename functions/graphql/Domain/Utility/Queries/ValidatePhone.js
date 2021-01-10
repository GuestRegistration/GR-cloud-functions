const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const helper = require('../../../../helpers');

const validatePhone = (parent, {phone}, context) => {
    clientAuthorizedMiddleware(context);
    return helper.validatePhoneNumber(phone);
};

module.exports = validatePhone;
