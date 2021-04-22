/**
 * capture a reservation charge authorization
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
 const captureStripeCharge = require('../../Services/Payment/Mutations/captureStripeCharge');

 const captureReservationCharge = async (parent, { stripe_account, charge_id, amount }, context) => {
    clientAuthorizedMiddleware(context);
    userAuthenticatedMiddleware(context);
     
   return await captureStripeCharge(parent, {stripe_account, charge_id, amount }, context);
};

 module.exports = captureReservationCharge;