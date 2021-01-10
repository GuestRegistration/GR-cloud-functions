/**
 * Get user by field
 */

const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getUserById = async (parent, { id }, context) =>  {
  clientAuthorizedMiddleware(context);
  const firestore = firebaseAdmin.firestore();

  const document =  await firestore.collection(collections.main).doc(id).get();

    if(document.exists){
      return {
        id: document.ref.id,
        ...document.data()
      };
    }
    return null;
};

module.exports = getUserById;