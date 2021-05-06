/**
 * Get a property stripe subscription
 */
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 
 const collections = require('../../Property/Enums/collections');
 const firebaseAdmin = require('../../../../admin');

 const getStripeSubscription = require('../../Services/Payment/Actions/GetStripeSubscription');

 const getSubscription = async (parent, { property_id }, context) =>  {

   clientAuthorizedMiddleware(context);
   
   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const property = await propertyRef.get();
  
   if(property.exists){
        const subscriptionDoc = await propertyRef.collection(collections.meta.name).doc(collections.meta.documents.stripe_subscription).get();
        if(subscriptionDoc.exists){
          return subscriptionDoc.data();
        }
    }else{
      throw new Error("Property does not exist")
    }

   return null;
 };

 

 const getSubscriptionFromStripe = async (subscription_id, stripe_account) => {
      return await getStripeSubscription(subscription_id, stripe_account)
 }
 
 module.exports = getSubscription;