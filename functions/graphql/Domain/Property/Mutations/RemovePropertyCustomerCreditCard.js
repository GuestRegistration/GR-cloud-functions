/**
 * create a new credit card for a property Stripe customer
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const propertySubscriptionMiddleware = require('../Middlewares/propertySubscription')

 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');
 
 const deleteStripeCustomerCard = require('../../Services/Payment/Actions/DeleteStripeCustomerCard');
 
 const stripeAuthorization = require('../Middlewares/stripeAuthorization');
 
  const removePropertyCustomerCreditCard = async (parent, {property_id, customer_id, card_id }, context) => {
    clientAuthorizedMiddleware(context);
   
    const firestore = firebaseAdmin.firestore();
    const propertyRef = firestore.collection(collections.main).doc(property_id);
    const property = await propertyRef.get();
 
    if(property.exists){

      await propertySubscriptionMiddleware(property_id)

      const query = await firestore.collectionGroup('checkin').where("credit_card.id", "==", card_id).get()
      if(!query.empty){
         throw new Error("Card is being used in a reservation");
      }
      const authorization = await stripeAuthorization(property_id);    

      const card = await deleteStripeCustomerCard({customer_id, card_id}, authorization.stripe_user_id);
      return card.deleted;

    }else{
       throw new Error("Property do not exist");
    }
 };
 
  module.exports = removePropertyCustomerCreditCard;
 
 