/**
 * Get a property stripe authorization
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const propertySubscriptionMiddleware = require('../Middlewares/propertySubscription')
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');
const stripeAuthorization = require('../Middlewares/stripeAuthorization');

const GetPropertyStripeAuthorization = async (parent, {property_id}, context) =>  {
  clientAuthorizedMiddleware(context);
  
  const firestore = firebaseAdmin.firestore();
  const propertyRef = firestore.collection(collections.main).doc(property_id);
  const property = await propertyRef.get();

  if(property.exists){

    userAuthorizedMiddleware(context, [property.data().user_id]);
    await propertySubscriptionMiddleware(property_id);

    return await stripeAuthorization(property_id)
  }else{
    throw new Error('The property does not exist');
  }
};

module.exports = GetPropertyStripeAuthorization;