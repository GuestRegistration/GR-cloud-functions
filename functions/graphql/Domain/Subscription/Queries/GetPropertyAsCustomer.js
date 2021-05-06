/**
 * Get a property stripe customer
 */
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 
 const collections = require('../../Property/Enums/collections');
 const firebaseAdmin = require('../../../../admin');

 const getStripeCustomer = require('../../Services/Payment/Actions/GetStripeCustomer');
 const getStripeCustomerSources = require('../../Services/Payment/Actions/GetStripeCustomerSources');

 const getCustomer = async (parent, { property_id }, context) =>  {
   clientAuthorizedMiddleware(context);
   
   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const property = await propertyRef.get();
  
   let customer = null;
   let sources = null;

   if(property.exists){
        const customerDoc = await propertyRef.collection(collections.meta.name).doc(collections.meta.documents.stripe_customer).get();
        if(customerDoc.exists){
            customer = customerDoc.data();
            sources = await getStripeCustomerSources({ customer_id: customer.id });
        }
    }else{
      throw new Error("Property does not exist")
    }

   return {customer, sources};
 };

 

 const getCustomerFromStripe = async (customer_id, stripe_account) => {
      return await getStripeCustomer(customer_id, stripe_account)
 }
 
 module.exports = getCustomer;