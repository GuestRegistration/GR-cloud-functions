/**
 * capture a reservation charge authorization
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
 const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');

 const propertyCollections = require('../../Property/Enums/collections');
 const firebaseAdmin = require('../../../../admin');

 const stripeAuthorization = require('../../Property/Middlewares/stripeAuthorization');
 const captureStripeCharge = require('../../Services/Payment/Actions/CaptureStripeCharge');

 const captureReservationCharge = async (parent, { property_id, charge_id, amount }, context) => {
    clientAuthorizedMiddleware(context);
    userAuthenticatedMiddleware(context);

    const firestore = firebaseAdmin.firestore();

    const propertyRef = firestore.collection(propertyCollections.main).doc(property_id);
    const property = await propertyRef.get();
   
    if(property.exists){

         userAuthorizedMiddleware(context, [property.data().user_id]);

         const stripe_authorization = await stripeAuthorization(property_id)
 
         return await captureStripeCharge( { charge_id, amount }, stripe_authorization.stripe_user_id);
          
    }else{
       throw new Error("Property do not exist");
    }
};

 module.exports = captureReservationCharge;