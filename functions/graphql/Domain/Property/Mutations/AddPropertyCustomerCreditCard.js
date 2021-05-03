/**
 * create a new credit card for a property Stripe customer
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');
 
 const createStripeCustomerCard = require('../../Services/Payment/Actions/CreateStripeCustomerCard');
 
 const stripeAuthorization = require('../Middlewares/stripeAuthorization');
 
  const addPropertyCustomerCreditCard = async (parent, {property_id, customer_id, source }, context) => {
    clientAuthorizedMiddleware(context);
   
    const firestore = firebaseAdmin.firestore();
    const propertyRef = firestore.collection(collections.main).doc(property_id);
    const property = await propertyRef.get();
 
    if(property.exists){

        const authorization = await stripeAuthorization(property_id);    

        return await createStripeCustomerCard({customer_id, source}, authorization.stripe_user_id);

    }else{
       throw new Error("Property do not exist");
    }
 };
 
  module.exports = addPropertyCustomerCreditCard;
 
 