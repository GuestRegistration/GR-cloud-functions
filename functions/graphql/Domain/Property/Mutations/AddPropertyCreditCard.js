/**
 * create a new credit card for a property
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');

 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');
 
 const createStripeCustomerCard = require('../../Services/Payment/Actions/CreateStripeCustomerCard');
  
  const addPropertyCreditCard = async (parent, {property_id, customer_id, source }, context) => {
    clientAuthorizedMiddleware(context);
   
    const firestore = firebaseAdmin.firestore();
    const propertyRef = firestore.collection(collections.main).doc(property_id);
    const property = await propertyRef.get();
 
    if(property.exists){

      return await createStripeCustomerCard({customer_id, source});

    }else{
       throw new Error("Property do not exist");
    }
 };
 
  module.exports = addPropertyCreditCard;
 
 