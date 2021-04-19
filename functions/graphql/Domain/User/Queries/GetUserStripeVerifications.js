/**
 * Get user stripe verification
 */

const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getUserStripeVerifications = async (parent, { user_id, property_id }, context) =>  {
  clientAuthorizedMiddleware(context);
    
  //if an id was specified, perhaps for admin purpose
  if(!user_id){
      user_id = userAuthenticatedMiddleware(context);
  }

  const verifications = [];

  const firestore = firebaseAdmin.firestore();

  const documents =  await firestore.collection(collections.main).doc(user_id)
                    .collection(collections.subcollections.stripe_identity_verifications)
                    .where('property_id', "==", property_id)
                    .get();

    if(!documents.empty){
        documents.forEach(snapshot => {
            verifications.push(snapshot.data())
        })
    }
    return verifications;
};

module.exports = getUserStripeVerifications;