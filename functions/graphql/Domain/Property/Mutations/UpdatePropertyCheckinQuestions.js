/**
 * Update property checkin questions
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
 const propertySubscriptionMiddleware = require('../Middlewares/propertySubscription')
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');
 
 
  const updatePropertyCheckinQuestions = async (parent, {property_id, questions}, context) => {
    clientAuthorizedMiddleware(context);
 
    const firestore = firebaseAdmin.firestore();
    const propertyRef = firestore.collection(collections.main).doc(property_id);
    const property = await propertyRef.get();
 
    if(property.exists){
 
      userAuthorizedMiddleware(context, [property.data().user_id]);
      await propertySubscriptionMiddleware(property_id);

      const questionsRef = propertyRef.collection(collections.meta.name).doc(collections.meta.documents.checkin_questions)
      
      await questionsRef.set({
        questions
      })
      
      return (await questionsRef.get()).data().questions;

    }else{
       throw new Error("Property not found");
    }
 };
 
  module.exports = updatePropertyCheckinQuestions;
 
 