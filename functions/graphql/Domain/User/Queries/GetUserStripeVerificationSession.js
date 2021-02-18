/**
 * Get user stripe verification
 */

const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getUserStripeVerificationSession = async (parent, { id }, context) =>  {
  clientAuthorizedMiddleware(context);

  let user_id = id;
    
  //if an id was specified, perhaps for admin purpose
  if(!user_id){
      user_id = userAuthenticatedMiddleware(context);
  }

  const firestore = firebaseAdmin.firestore();

  const document =  await firestore.collection(collections.main).doc(user_id)
                    .collection(collections.meta.name).doc(collections.meta.documents.stripe_verification_session)
                    .get();

    if(document.exists){
        const session = document.data()
        return {
            session,
            last_report: session.last_verification_report
        }
    }
    return null;
};

module.exports = getUserStripeVerificationSession;