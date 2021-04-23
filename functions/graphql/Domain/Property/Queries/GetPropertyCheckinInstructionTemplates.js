/**
 * Get a property checkin instruction templates
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getPropertyCheckinInstructionTemplates = async (parent, { property_id }, context) =>  {
  
  clientAuthorizedMiddleware(context);
  
  const firestore = firebaseAdmin.firestore();

  const templates = [];
  const QuerySnapshots = await firestore.collection(collections.main).doc(property_id).collection(collections.subcollections.checkin_instructions).get();
  QuerySnapshots.forEach((snapshot) => {
    templates.push({
      id: snapshot.ref.id,
      ...snapshot.data()
    })
  });  
    return templates;
};

module.exports = getPropertyCheckinInstructionTemplates;