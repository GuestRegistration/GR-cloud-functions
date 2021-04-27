/**
 * Get a property checkin instruction templates
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getPropertyCheckinQuestions = async (parent, { property_id }, context) =>  {
  
  clientAuthorizedMiddleware(context);
  
  const firestore = firebaseAdmin.firestore();

  const document = await firestore.collection(collections.main).doc(property_id)
            .collection(collections.meta.name)
            .doc(collections.meta.documents.checkin_questions).get();

    if(document.exists) return document.data().questions
    
    return [];
};

module.exports = getPropertyCheckinQuestions;