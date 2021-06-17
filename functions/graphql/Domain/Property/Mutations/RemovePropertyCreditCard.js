/**
 * remove property credit card from Stripe
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');

 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');
 
 const deleteStripeCustomerCard = require('../../Services/Payment/Actions/DeleteStripeCustomerCard');
  
  const removePropertyCreditCard = async (parent, {property_id, customer_id, card_id }, context) => {
   clientAuthorizedMiddleware(context);

   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const property = await propertyRef.get();

   if(property.exists){

   const card = await deleteStripeCustomerCard({customer_id, card_id});
   return card.deleted;

   }else{
       throw new Error("Property do not exist");
   }
 };
 
  module.exports = removePropertyCreditCard;
 
 