/**
 * Get a property charge
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getPropertyCharge = async (parent, { property_id, charge_id }, context) =>  {
  
  clientAuthorizedMiddleware(context);
  
  const firestore = firebaseAdmin.firestore();

  const charge = await firestore.collection(collections.main).doc(property_id).collection(collections.subcollections.charges).doc(charge_id).get();
  
  if(charge.exists){
    return {
      id: charge.ref.id,
      ...charge.data()
    }
  }
  return null;

};

module.exports = getPropertyCharge;