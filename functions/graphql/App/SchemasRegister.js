/**
 * All schemas are registered here
 */
const schemas = [
    
    require('../Domain/Utility/schema'),
    require('../Domain/Auth/schema'),
    require('../Domain/User/schema'),
    require('../Domain/Property/schema'),
    require('../Domain/Reservation/schema'),
    require('../Domain/Services/Identity/schema'),
    require('../Domain/Services/Payment/schema'),
    require('../Domain/Services/Account/schema'),
    require('../Domain/Subscription/schema'),
];

module.exports = schemas;