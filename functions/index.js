
exports.graphql = require('./endpoints/graphql');
exports.api = require('./endpoints/rest');
exports.web = require('./endpoints/web');

// when user authentication is deleted
exports.onUserAuthDeleted = require('./functions/userAuthDeleted');

// when a new user document is created
exports.onUserCreated = require('./functions/userCreated');

// when a user document is updated
exports.onUserUpdated = require('./functions/userUpdated');

// when a new ID access history is created
exports.onUserIDAccessed = require('./functions/userIDAccessed');

// when new property property is created
exports.onPropertyCreated = require('./functions/propertyCreated');

// when a property document is updated
exports.onPropertyUpdated = require('./functions/propertyUpdated');
                   
// when a new reservation is created
exports.onReservationCreated = require('./functions/reservationCreated');

// when a reservation document is updated
exports.onReservationUpdated = require('./functions/reservationUpdated');

// when a reservation document is created
exports.onReservationDocumentCreated = require('./functions/reservationDocumentCreated');

// when a new stripe identity event is received
exports.onStripeIdentityEventCreated = require('./functions/stripeIdentityEventCreated');

// when user verification session is updated
exports.onUserStripeVerificationSessionUpdated = require('./functions/userStripeVerificationSessionUpdated');
