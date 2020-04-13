const client_middleware = require('./../../../middleware/client_authorized')
const helper = require('../../../../helper')

const validatePhone = (parent, {phone}, context) => {
    client_middleware(context)
    return helper.validatePhoneNumber(phone)
} 
module.exports = validatePhone 