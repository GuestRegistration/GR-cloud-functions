/**
 * Get user verification
 */

const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthenticatedMiddleware = require('../../../Middlewares/UserAuthenticated');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getUserVerificationReport = async (parent, { id }, context) =>  {
  clientAuthorizedMiddleware(context);

  let user_id = id;
    
  //if an id was specified, perhaps for admin purpose
  if(!user_id){
      user_id = userAuthenticatedMiddleware(context);
  }

  const firestore = firebaseAdmin.firestore();

  const document =  await firestore.collection(collections.main).doc(user_id)
                    .collection(collections.meta.name).doc(collections.meta.documents.verification_report)
                    .get();

    if(document.exists){
        return document.data();
    }
    return null;
};

module.exports = getUserVerificationReport;