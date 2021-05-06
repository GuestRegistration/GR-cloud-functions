/**
 * Create property as Stripe customer
 */

 //  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const collections = require('../../Property/Enums/collections');
const firebaseAdmin = require('../../../../admin');

const createStripeCustomer = require('../../Services/Payment/Actions/CreateStripeCustomer');
const getStripeCustomerSources = require('../../Services/Payment/Actions/GetStripeCustomerSources');

 const createCustomer = async (parent, {property_id, source}, context) => {

   clientAuthorizedMiddleware(context);
  
   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const propertyDoc = await propertyRef.get();

   if(propertyDoc.exists){
      const property = propertyDoc.data();
      
      userAuthorizedMiddleware(context, [property.user_id]);
      
      const customer = await createStripeCustomer({ 
         name: property.name, 
         email: property.email,
         phone: property.phone,
         metadata: {
            property_id,
            user_id: property.user_id
         },
         description: "Property on Guest Registration",
         source
      })

      return {
         customer,
         sources: await getStripeCustomerSources({ customer_id: customer.id})
      }
   }else{
      throw new Error("Property do not exist");
   }
};

 module.exports = createCustomer;

