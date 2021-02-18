/**
 * Set Stripe authorization and save for property
 */

 //  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const config = require('../../../../config');
const Stripe = require('stripe');
const stripe = Stripe(config.stripe.test.secretKey);


 const unetPropertyStripeAuthorization = async (parent, { property_id, stripe_user_id }, context) => {
   clientAuthorizedMiddleware(context);

   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const property = await propertyRef.get();

   if(property.exists){
      userAuthorizedMiddleware(context, [property.data().user_id]);

      const payment = await firestore.collection(collections.main).doc(property_id).collection(collections.meta.name).doc(collections.meta.documents.payment).get();
      if(payment.exists && payment.data().stripe_authorization){
         try {
            
            const response = await stripe.oauth.deauthorize({
               client_id: config.stripe.test.clientId,
               stripe_user_id: payment.data().stripe_authorization.stripe_user_id,
            })
      
            await propertyRef.collection(collections.meta.name).doc(collections.meta.documents.payment).set({
               stripe_authorization: null
            })
      
            return response;
         
         } catch (error) {
            throw error
         }
      }else{
         throw new Error("No payment authorization");
      }
      
   }else{
      throw new Error("Property do not exist");
   }
};

 module.exports = unetPropertyStripeAuthorization;

