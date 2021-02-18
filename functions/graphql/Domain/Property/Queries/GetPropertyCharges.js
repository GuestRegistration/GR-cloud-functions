/**
 * Get a property charges
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getPropertyCharges = async (parent, { property_id }, context) =>  {
  
  clientAuthorizedMiddleware(context);
  
  const firestore = firebaseAdmin.firestore();

  const charges = [];
  const QuerySnapshots = await firestore.collection(collections.main).doc(property_id).collection(collections.subcollections.charges).get();
  QuerySnapshots.forEach((snapshot) => {
    charges.push({
      id: snapshot.ref.id,
      ...snapshot.data()
    })
  });  
    return charges;
};

module.exports = getPropertyCharges;