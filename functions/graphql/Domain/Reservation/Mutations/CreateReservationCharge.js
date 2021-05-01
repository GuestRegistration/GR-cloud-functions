/**
 * check in reservation
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
 const propertyCollections = require('../../Property/Enums/collections');
 const firebaseAdmin = require('../../../../admin');

 const stripeAuthorization = require('../../Property/Middlewares/stripeAuthorization');
 const createStripeCharge = require('../../Services/Payment/Actions/CreateStripeCharge');

 const createReservationCharge = async (parent, {property_id, source, customer, amount, currency, description, receipt_email, metadata, capture }, context) => {
    clientAuthorizedMiddleware(context);
    userAuthenticatedMiddleware(context);

   const firestore = firebaseAdmin.firestore();

   const propertyRef = firestore.collection(propertyCollections.main).doc(property_id);
   const property = await propertyRef.get();
  
   if(property.exists){

      const stripe_authorization = await stripeAuthorization(property_id)

      return await createStripeCharge({ source, customer, amount, currency, description, receipt_email, metadata, capture }, stripe_authorization.stripe_user_id);

   }else{
      throw new Error("Property do not exist");
   }
     
};

 module.exports = createReservationCharge;