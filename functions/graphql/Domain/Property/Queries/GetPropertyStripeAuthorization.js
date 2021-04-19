/**
 * Get a property payment
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const GetPropertyStripeAuthorization = async (parent, {property_id}, context) =>  {
  clientAuthorizedMiddleware(context);
  
  const firestore = firebaseAdmin.firestore();

  const document = await firestore.collection(collections.main).doc(property_id).collection(collections.meta.name).doc(collections.meta.documents.stripe_authorization).get();
    if(document.exists){
      //userAuthorizedMiddleware(context, [document.data().user_id]);

      return document.data();
    }
    return null;
};

module.exports = GetPropertyStripeAuthorization;