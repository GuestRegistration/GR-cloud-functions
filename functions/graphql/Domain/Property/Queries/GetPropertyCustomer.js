/**
 * Get a property stripe customer
 */
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
 
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');

 const getStripeCustomer = require('../../Services/Payment/Actions/GetStripeCustomer');
 const getStripeCustomerSources = require('../../Services/Payment/Actions/GetStripeCustomerSources');

 const stripeAuthorization = require('../Middlewares/stripeAuthorization');

 const getPropertyCustomer = async (parent, {property_id, user_id}, context) =>  {
   clientAuthorizedMiddleware(context);

   if(!user_id){
      user_id = userAuthenticatedMiddleware(context);
  }
   
   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const property = await propertyRef.get();
  
   let customer = null;
   let sources = null;

    if(property.exists){
        const customerDocument = await propertyRef.collection(collections.subcollections.stripe_customers).doc(user_id).get();
        if(customerDocument.exists){
            customer = customerDocument.data();

            const authorization = await stripeAuthorization(property_id);

            if(authorization.stripe_user_id){
              try {
                sources = await getStripeCustomerSources({ customer_id: customer.id }, authorization.stripe_user_id);
              } catch (error) {
                sources = null
              }
            }
        }
    }
    return {customer, sources};
 };

 

 const getCustomerFromStripe = async (customer_id, stripe_account) => {
      return await getStripeCustomer(customer_id, stripe_account)
 }
 
 module.exports = getPropertyCustomer;