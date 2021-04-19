/**
 * Create property charge
 */

 //  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');


 const createPropertyCharge = async (parent, {property_id, data}, context) => {
   clientAuthorizedMiddleware(context);

   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const property = await propertyRef.get();

   if(property.exists){

      userAuthorizedMiddleware(context, [property.data().user_id]);


     const charge = await propertyRef.collection(collections.subcollections.charges).add(data)

      return {
         id: charge.id,
         ...(await charge.get()).data()
      } 
      
   }else{
      throw new Error("Property do not exist");
   }
};

 module.exports = createPropertyCharge;

