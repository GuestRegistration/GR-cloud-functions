
/**
 * Confirm if a user exist by a field
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');
 
const confirmUserByField = async (parent, {field, value}, context) => {
    clientAuthorizedMiddleware(context);
    const firestore = firebaseAdmin.firestore();

   const result = await firestore.collection(collections.user.main).where(field, '==', value).get();
   if(result.size > 0){
       return true;
   } 
   return false;
};

module.exports = confirmUserByField;
