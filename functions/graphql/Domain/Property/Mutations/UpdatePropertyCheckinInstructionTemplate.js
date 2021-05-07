/**
 * Update property checkin instruction template
 */

 //  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const propertySubscriptionMiddleware = require('../Middlewares/propertySubscription')
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');


 const updatePropertyCheckinInstructionTemplate = async (parent, {property_id, template_id, title, body}, context) => {
   clientAuthorizedMiddleware(context);

   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const property = await propertyRef.get();

   if(property.exists){

      userAuthorizedMiddleware(context, [property.data().user_id]);
      await propertySubscriptionMiddleware(property_id);

     const templateRef = await propertyRef.collection(collections.subcollections.checkin_instructions).doc(template_id);
      if((await templateRef.get()).exists){

         await templateRef.update({
            title: title || 'No title',
            body
         })

         return {
            id: templateRef.id,
            ...(await templateRef.get()).data()
         }

      }else{
         throw new Error("Template not found");
      }
          
   }else{
      throw new Error("Property not found");
   }
};

 module.exports = updatePropertyCheckinInstructionTemplate;

