/**
 * Create property subscription
 */
const config = require('../../../../config');

 //  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const collections = require('../../Property/Enums/collections');
const firebaseAdmin = require('../../../../admin');

const createStripeSubscription = require('../../Services/Payment/Actions/CreateStripeSubscription');

 const createPropertySubscription = async (parent, {property_id, customer_id, credit_card_id}, context) => {

   clientAuthorizedMiddleware(context);
  
   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const propertyDoc = await propertyRef.get();

   if(propertyDoc.exists){

      const property = propertyDoc.data();

      userAuthorizedMiddleware(context, [property.user_id]);

      const metadata = {
         property_id,
         user_id: property.user_id
      }

      const getCustomerID = async () => {
         if(customer_id) return customer_id;
         const customerDoc = await propertyRef.collection(collections.meta.name).doc(collections.meta.documents.stripe_customer).get();
        if(customerDoc.exists){
            const customer = customerDoc.data();
            return customer.id;
        }else{
           throw new Error("Property not found as a subscriber")
        }
      }

      return await createStripeSubscription({ 
         customer_id: await getCustomerID(), 
         price_id: config.stripe.subscription.price_id, 
         metadata,
         credit_card_id,
         trial_period_days: property.subscription && property.subscription.status === 'canceled' ? 0 : undefined
      });
       
   }else{
      throw new Error("Property do not exist");
   }
};

 module.exports = createPropertySubscription;

