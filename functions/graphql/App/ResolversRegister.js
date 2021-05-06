/**
 * All resolvers are registered here
 */
const resolvers = [
    
    require('../Domain/Utility/resolver'),
    require('../Domain/Auth/resolver'),
    require('../Domain/User/resolver'),
    require('../Domain/Property/resolver'),
    require('../Domain/Reservation/resolver'),
    require('../Domain/Services/Identity/resolver'),
    require('../Domain/Services/Payment/resolver'),
    require('../Domain/Subscription/resolver'),
];

module.exports = resolvers;