/**
 * Cancel property subscription
 */
 const config = require('../../../../config');

 //  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const collections = require('../../Property/Enums/collections');
const firebaseAdmin = require('../../../../admin');

const cancelStripeSubscription = require('../../Services/Payment/Actions/CancelStripeSubscription');

 const cancelPropertySubscription = async (parent, {property_id}, context) => {

   clientAuthorizedMiddleware(context);
  
   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const propertyDoc = await propertyRef.get();

   if(propertyDoc.exists){

      userAuthorizedMiddleware(context, [propertyDoc.data().user_id]);

      const subscription = propertyDoc.data().subscription;
      if(subscription) return await cancelStripeSubscription(subscription.id)
      else throw new Error("Property subscription not found")
   }else{
      throw new Error("Property do not exist");
   }
};

 module.exports = cancelPropertySubscription;

