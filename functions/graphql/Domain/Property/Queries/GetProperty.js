/**
 * Get a single property
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getProperty = async (parent, {id}, context) =>  {
  clientAuthorizedMiddleware(context);
  
  const firestore = firebaseAdmin.firestore();

  const document = await firestore.collection(collections.main).doc(id).get();
    if(document.exists){
      let property = document.data();
      property.id = document.ref.id;
      return property;
    }
    return null;
};

module.exports = getProperty;