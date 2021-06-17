
 //  middlewares
 const clientAuthorizedMiddleware = require('../../../../Middlewares/ClientAuthorized');
 const propertySubscriptionMiddleware = require('../../Middlewares/propertySubscription')

 const collections = require('../../Enums/collections');
 const firebaseAdmin = require('../../../../../admin');
   
  const setIntegration = async (parent, {property_id, integration }, context) => {
    clientAuthorizedMiddleware(context);
   
    const firestore = firebaseAdmin.firestore();
    const propertyRef = firestore.collection(collections.main).doc(property_id);
    const property = await propertyRef.get();
 
    if(property.exists){
        await propertySubscriptionMiddleware(property_id);
        
        const integrationsRef = propertyRef.collection(collections.meta.name).doc(collections.meta.documents.integrations);
        const integrationsDoc = await integrationsRef.get();
        if(integrationsDoc.exists){
            await integrationsRef.update(integration);
        } else {
            await integrationsRef.set(integration);  
        }

        return integration;
    }else{
       throw new Error("Property do not exist");
    }
 };
 
  module.exports = setIntegration;
 
 