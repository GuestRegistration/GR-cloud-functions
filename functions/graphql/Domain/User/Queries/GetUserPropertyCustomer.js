/**
 * Get a property stripe customer
 */
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');

 const stripeAuthorization = require('../../Property/Middlewares/stripeAuthorization');
 const getStripeCustomerSources = require('../../Services/Payment/Actions/GetStripeCustomerSources');

 const getUserPropertyCustomer = async (parent, {user_id, property_id}, context) =>  {
   clientAuthorizedMiddleware(context);
  
    if(!user_id){
        user_id = userAuthenticatedMiddleware(context);
    }

    let customer = null;
    let sources = null;
    
    const firestore = firebaseAdmin.firestore();
    const userRef = firestore.collection(collections.main).doc(user_id);
 
    const customerDocument = await userRef.collection(collections.subcollections.stripe_property_customers).doc(property_id).get();
    if(customerDocument.exists){
        customer = customerDocument.data();

        const authorization = await stripeAuthorization(property_id)
        sources = await getStripeCustomerSources({ customer_id: customer.id }, authorization.stripe_user_id);
    }
    
    return {customer, sources};
 };
 
 module.exports = getUserPropertyCustomer;