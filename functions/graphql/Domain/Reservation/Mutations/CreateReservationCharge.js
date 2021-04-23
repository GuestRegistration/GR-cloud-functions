/**
 * check in reservation
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
 const createStripeCharge = require('../../Services/Payment/Actions/CreateStripeCharge');

 const createReservationCharge = async (parent, {stripe_account, source, amount, currency, description, receipt_email, metadata, capture }, context) => {
    clientAuthorizedMiddleware(context);
    userAuthenticatedMiddleware(context);
     
   return await createStripeCharge({ stripe_account, source, amount, currency, description, receipt_email, metadata, capture });
};

 module.exports = createReservationCharge;