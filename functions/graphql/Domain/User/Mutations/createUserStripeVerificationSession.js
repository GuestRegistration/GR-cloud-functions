/**
 * create user stripe verification
 */

 //  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const UserAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');

const propertyCollections = require('../../Property/Enums/collections');
const firebaseAdmin = require('../../../../admin');

const stripeAuthorization = require('../../Property/Middlewares/stripeAuthorization');
const createVerificationSession = require('../../Services/Identity/Actions/CreateStripeVerificationSession')   

const createUserStripeVerificationSession = async (parent, { property_id, metadata, return_url, refresh_url }, context) => {
    clientAuthorizedMiddleware(context);
    UserAuthenticatedMiddleware(context);

    const firestore = firebaseAdmin.firestore();

    const propertyRef = firestore.collection(propertyCollections.main).doc(property_id);
    const property = await propertyRef.get();
   
    if(property.exists){

      const stripe_authorization = await stripeAuthorization(property_id)

      return await createVerificationSession({ metadata, return_url, refresh_url }, stripe_authorization.stripe_user_id)
          
    }else{
       throw new Error("Property do not exist");
    }
 };

module.exports = createUserStripeVerificationSession;