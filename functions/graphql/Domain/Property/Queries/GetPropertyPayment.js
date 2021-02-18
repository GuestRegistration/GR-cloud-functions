/**
 * Get a property payment
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getPropertyPayment = async (parent, {property_id}, context) =>  {
  clientAuthorizedMiddleware(context);
  
  const firestore = firebaseAdmin.firestore();

  const document = await firestore.collection(collections.main).doc(property_id).collection(collections.meta.name).doc(collections.meta.documents.payment).get();
    if(document.exists){
      return document.data();
    }
    return null;
};

module.exports = getPropertyPayment;