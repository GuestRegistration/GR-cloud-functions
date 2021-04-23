/**
 * check in reservation
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
 const createStripeRefund = require('../../Services/Payment/Actions/CreateStripeRefund');

 const refundReservationCharge = async (parent, {stripe_account, charge_id, amount, reason, customer_note }, context) => {

    clientAuthorizedMiddleware(context);
    userAuthenticatedMiddleware(context);

    if(reason && !['duplicate', 'fraudulent', 'requested_by_customer'].includes(reason)) throw new Error('Invalid reason'); 
     
   return await createStripeRefund({ stripe_account, charge_id, amount, reason, customer_note });
};

 module.exports = refundReservationCharge;