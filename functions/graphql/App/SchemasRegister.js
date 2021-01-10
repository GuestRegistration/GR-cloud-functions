/**
 * All schemas are registered here
 */
const schemas = [
    
    require('../Domain/Utility/schema'),
    require('../Domain/Auth/schema'),
    require('../Domain/User/schema'),
    require('../Domain/Property/schema'),
    require('../Domain/Reservation/schema'),
    
];

module.exports = schemas;