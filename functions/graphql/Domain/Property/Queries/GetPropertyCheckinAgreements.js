/**
 * Get a property checkin instruction templates
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getPropertyCheckinAgreements = async (parent, { property_id }, context) =>  {
  
  clientAuthorizedMiddleware(context);
  
  const firestore = firebaseAdmin.firestore();

  const document = await firestore.collection(collections.main).doc(property_id)
                .collection(collections.meta.name)
                .doc(collections.meta.documents.checkin_agreements).get();

    if(document.exists) return document.data().agreements

    return [];
};

module.exports = getPropertyCheckinAgreements;