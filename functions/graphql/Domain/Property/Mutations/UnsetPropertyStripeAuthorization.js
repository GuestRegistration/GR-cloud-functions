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
const stripe = Stripe(config.stripe.secretKey);


 const unetPropertyStripeAuthorization = async (parent, { property_id, stripe_user_id }, context) => {
   clientAuthorizedMiddleware(context);

   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const property = await propertyRef.get();

   if(property.exists){
      userAuthorizedMiddleware(context, [property.data().user_id]);

      const stripe_authorization = await firestore.collection(collections.main).doc(property_id).
                                 collection(collections.meta.name).doc(collections.meta.documents.stripe_authorization).get();
      if(stripe_authorization.exists){
         const authorization = stripe_authorization.data();
         try {
            
            const response = await stripe.oauth.deauthorize({
               client_id: config.stripe.clientId,
               stripe_user_id: authorization.stripe_user_id,
            })
      
            await propertyRef.collection(collections.meta.name).doc(collections.meta.documents.stripe_authorization).delete();

            await propertyRef.update({
               stripe_connected: false
            });   
      
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

