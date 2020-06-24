
// GraphQL api
exports.api = require('./functions/api');

// when user authentication is deleted
exports.onUserAuthDeleted = require('./functions/userAuthDeleted')

// when a new user document is created
exports.onUserCreated = require('./functions/userCreated')

// when a user document is updated
exports.onUserUpdated = require('./functions/userUpdated')


// when new property property is created
exports.onPropertyCreated = require('./functions/propertyCreated')

// when a property document is updated
exports.onPropertyUpdated = require('./functions/propertyUpdated')
                   
// when a new reservation is created
exports.onReservationCreated = require('./functions/reservationCreated')

// when a reservation document is updated
exports.onReservationUpdated = require('./functions/reservationUpdated')