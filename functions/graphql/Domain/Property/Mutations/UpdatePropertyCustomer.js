/**
 * Update property customer
 */

 //  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const updateStripeCustomer = require('../../Services/Payment/Actions/UpdateStripeCustomer');
const getStripeCustomerSources = require('../../Services/Payment/Actions/GetStripeCustomerSources');

const stripeAuthorization = require('../Middlewares/stripeAuthorization');

 const updatePropertyCustomer = async (parent, {property_id, customer_id, user_id, name, source, email, phone, description }, context) => {
   clientAuthorizedMiddleware(context);
  
   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const property = await propertyRef.get();

   if(property.exists){

      const authorization = await stripeAuthorization(property_id);

      const metadata = {
         property_id, user_id
      }
      const customer = await updateStripeCustomer(customer_id, { name, source, email, phone, description, metadata }, authorization.stripe_user_id)

      return {
         customer,
         sources: await getStripeCustomerSources({ customer_id: customer.id}, authorization.stripe_user_id)
      }
   }else{
      throw new Error("Property do not exist");
   }
};

 module.exports = updatePropertyCustomer;

