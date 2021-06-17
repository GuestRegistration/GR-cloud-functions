/**
 * Get a property charge
 */
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');

const getPropertyIntegrations = async (parent, { property_id }, context) =>  {
  
  clientAuthorizedMiddleware(context);
  
  const firestore = firebaseAdmin.firestore();
  const propertyRef = firestore.collection(collections.main).doc(property_id);

  const property = await propertyRef.get();
  if(property.exists){
      userAuthorizedMiddleware(context, [property.data().user_id]);
       
      const integrationsRef = propertyRef.collection(collections.meta.name).doc(collections.meta.documents.integrations);
      const integrationsDoc = await integrationsRef.get();
      return integrationsDoc.exists ? integrationsDoc.data() : null;

  }else{
      throw new Error('The property does not exist');
  }

};

module.exports = getPropertyIntegrations;