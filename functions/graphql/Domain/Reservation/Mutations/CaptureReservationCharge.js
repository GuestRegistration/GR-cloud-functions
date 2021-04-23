/**
 * capture a reservation charge authorization
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
 const captureStripeCharge = require('../../Services/Payment/Actions/CaptureStripeCharge');

 const captureReservationCharge = async (parent, { stripe_account, charge_id, amount }, context) => {
    clientAuthorizedMiddleware(context);
    userAuthenticatedMiddleware(context);
     
   return await captureStripeCharge( { stripe_account, charge_id, amount });
};

 module.exports = captureReservationCharge;