/**
 * Set Stripe authorization and save for property
 */

 //  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const propertySubscriptionMiddleware = require('../Middlewares/propertySubscription')
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const config = require('../../../../config');
const Stripe = require('stripe');
const stripe = Stripe(config.stripe.secretKey);


 const setPropertyStripeAuthorization = async (parent, {property_id, grant_type, code}, context) => {
   clientAuthorizedMiddleware(context);

   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const property = await propertyRef.get();

   if(property.exists){
      userAuthorizedMiddleware(context, [property.data().user_id]);
      await propertySubscriptionMiddleware(property_id);

      try {
         const response = await stripe.oauth.token({ grant_type, code });

         await propertyRef.collection(collections.meta.name).doc(collections.meta.documents.stripe_authorization).set({
            ...response
         })

         await propertyRef.update({
            stripe_connected: true
         });
   
         return response;
         
      } catch (error) {
         throw error
      }
      
   }else{
      throw new Error("Property do not exist");
   }
};

 module.exports = setPropertyStripeAuthorization;

