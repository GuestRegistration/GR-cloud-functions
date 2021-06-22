/**
 * check in reservation
 */

 //  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const propertySubscriptionMiddleware = require('../../Property/Middlewares/propertySubscription')

const propertyCollections = require('../../Property/Enums/collections');
const firebaseAdmin = require('../../../../admin');

const stripeAuthorization = require('../../Property/Middlewares/stripeAuthorization');
const createStripeRefund = require('../../Services/Payment/Actions/CreateStripeRefund');
const getStripeCharge = require('../../Services/Payment/Actions/GetStripeCharge');

 const refundReservationCharge = async (parent, {property_id, charge_id, amount, reason, customer_note }, context) => {

    clientAuthorizedMiddleware(context);
    userAuthenticatedMiddleware(context);

    const params = { charge_id, amount, customer_note };
   
    if(reason !== '' && reason !== null)params.reason = reason
    else if(reason && !['duplicate', 'fraudulent', 'requested_by_customer'].includes(reason)) throw new Error('Invalid reason'); 

    const firestore = firebaseAdmin.firestore();

    const propertyRef = firestore.collection(propertyCollections.main).doc(property_id);
    const property = await propertyRef.get();
   
    if(property.exists){
      await propertySubscriptionMiddleware(property_id);

      // userAuthorizedMiddleware(context, [property.data().user_id]);

      const stripe_authorization = await stripeAuthorization(property_id)
      
      const refund = await createStripeRefund( params, stripe_authorization.stripe_user_id);
      refund.charge =  await getStripeCharge(refund.charge, stripe_authorization.stripe_user_id);
      
      return refund;
          
    }else{
       throw new Error("Property do not exist");
    }
      
};

 module.exports = refundReservationCharge;