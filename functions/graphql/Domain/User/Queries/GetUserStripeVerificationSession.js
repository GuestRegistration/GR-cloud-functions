/**
 * Get user verification session
 */

 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');

 const stripeAuthorization = require('../../Property/Middlewares/stripeAuthorization');
 const stripeVerificationSession = require('../../Services/Identity/Actions/GetStripeVerificationSession');
 
 const getUserStripeVerificationSession = async (parent, { user_id, verification_id }, context) =>  {
   clientAuthorizedMiddleware(context);
 
     let session = null;
     const auth = userAuthenticatedMiddleware(context);
 
     if(!user_id){
         user_id = auth;
     }
 
     const firestore = firebaseAdmin.firestore();
 
     const verificationRef = firestore.collection(collections.main).doc(user_id)
                         .collection(collections.subcollections.stripe_identity_verifications)
                         .doc(verification_id);
                     
   const verificationDoc = await verificationRef.get();
 
     if(verificationDoc.exists){
         const verification = document.data();
         if(verification.session){

            const stripe_authorization = await stripeAuthorization(verification.property_id)
            session = await stripeVerificationSession({id: verification.session}, stripe_authorization.stripe_user_id);
         }
 
     }
 
     return session;
 };
 
 module.exports = getUserStripeVerificationSession;