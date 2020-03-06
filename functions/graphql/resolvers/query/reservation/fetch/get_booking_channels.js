
/**
 * Get list of available booking channels
 */

const client_middleware = require('./../../../../middleware/client_authorized')

const getBookingChannels = (parent, args, context) => {
    client_middleware(context)
    
    return [
        {
            channel_code: 1,
            channel_name: "AirBnB"
        },
        {
            channel_code: 2,
            channel_name: "Bed24" 
        }
    
    ]    
} 
module.exports = getBookingChannels 