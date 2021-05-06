/**
 * Create property subscription
 */
const config = require('../../../../config');

 //  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const collections = require('../../Property/Enums/collections');
const firebaseAdmin = require('../../../../admin');

const updateStripeSubscription = require('../../Services/Payment/Actions/UpdateStripeSubscription');

 const updatePropertySubscription = async (parent, {property_id, update}, context) => {

   clientAuthorizedMiddleware(context);
  
   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const propertyDoc = await propertyRef.get();

   if(propertyDoc.exists){

      const property = propertyDoc.data();

      userAuthorizedMiddleware(context, [property.user_id]);

      const subscription = property.subscription;
      if(subscription) return await updateStripeSubscription(subscription.id, update)
      else throw new Error("Property subscription not found")
   }else{
      throw new Error("Property do not exist");
   }
};

 module.exports = updatePropertySubscription;

