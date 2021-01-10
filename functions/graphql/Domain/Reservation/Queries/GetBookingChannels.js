
/**
 * Get list of available booking channels
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const channels = require('../Enums/bookingChannels');

const getBookingChannels = (parent, args, context) => {
    clientAuthorizedMiddleware(context);
    
    return channels;   
};
module.exports = getBookingChannels;