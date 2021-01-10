/**
 * update a property image
 */

 //  middlewares
 const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
 const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
 const collections = require('../Enums/collections');
 const firebaseAdmin = require('../../../../admin');


 const updatePropertyImage = async (parent, {id, image}, context) => {
   clientAuthorizedMiddleware(context);

   const firestore = firebaseAdmin.firestore();

   const property = await firestore.collection(collections.main).doc(id).get();
   if(property.exists){
      userAuthorizedMiddleware(context, [property.data().user_id]);

      await firestore.collection(collections.main).doc(id).update({ image });
      return image;
   }else{
      throw new Error("Property do not exist");
   }
};

 module.exports = updatePropertyImage;

