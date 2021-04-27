/**
 * Update property checkin agreements
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');
 
 
  const updatePropertyCheckinAgreements = async (parent, {property_id, agreements}, context) => {
    clientAuthorizedMiddleware(context);
 
    const firestore = firebaseAdmin.firestore();
    const propertyRef = firestore.collection(collections.main).doc(property_id);
    const property = await propertyRef.get();
 
    if(property.exists){
 
       userAuthorizedMiddleware(context, [property.data().user_id]);
 
      const agreementsRef = propertyRef.collection(collections.meta.name).doc(collections.meta.documents.checkin_agreements)
    
      await agreementsRef.set({
        agreements
      })
      
      return (await agreementsRef.get()).data().agreements;

    }else{
       throw new Error("Property not found");
    }
 };
 
  module.exports = updatePropertyCheckinAgreements;
 
 