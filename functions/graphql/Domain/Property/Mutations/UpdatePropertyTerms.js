/**
 * update a property terms url
 */
  //  middlewares
  const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
  const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
  const collections = require('../Enums/collections');
  const firebaseAdmin = require('../../../../admin'); 

 const updatePropertyTerms = async (parent, {id, terms_url}, context) => {
    clientAuthorizedMiddleware(context);
     
    const firestore = firebaseAdmin.firestore();

   const propertyRef = firestore.collection(collections.main).doc(id);
   const property = await propertyRef.get();
   if(property.exists){
        userAuthorizedMiddleware(context,[property.data().user_id]);
                       
        await firestore.collection(collections.main).doc(id).update({
            terms: terms_url
         });
         return terms_url;
   } else{
       throw new Error('Property does not exist');
   } 
};

 module.exports = updatePropertyTerms;

