/**
 * Create property checkin instruction template
 */

 //  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');


 const createPropertyCheckinInstructionTemplate = async (parent, {property_id, title, body}, context) => {
   clientAuthorizedMiddleware(context);

   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const property = await propertyRef.get();

   if(property.exists){

      userAuthorizedMiddleware(context, [property.data().user_id]);


     const template = await propertyRef.collection(collections.subcollections.checkin_instructions).add({
        title: title || 'No title',
         body
      })

      return {
         id: template.id,
         ...(await template.get()).data()
      } 
      
   }else{
      throw new Error("Property do not exist");
   }
};

 module.exports = createPropertyCheckinInstructionTemplate;

