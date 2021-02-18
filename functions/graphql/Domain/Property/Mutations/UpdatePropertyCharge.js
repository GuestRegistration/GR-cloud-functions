/**
 * Update property charge
 */

 //  middlewares
const clientAuthorizedMiddleware = require('../../../Middlewares/ClientAuthorized');
const userAuthorizedMiddleware = require('../../../Middlewares/UserAuthorized');
const collections = require('../Enums/collections');
const firebaseAdmin = require('../../../../admin');


 const createPropertyCharge = async (parent, {property_id, charge_id, title, amount, type, description}, context) => {
   clientAuthorizedMiddleware(context);

   const firestore = firebaseAdmin.firestore();
   const propertyRef = firestore.collection(collections.main).doc(property_id);
   const property = await propertyRef.get();

   if(property.exists){

      userAuthorizedMiddleware(context, [property.data().user_id]);

     const chargeRef = await propertyRef.collection(collections.subcollections.charges).doc(charge_id);
      if((await chargeRef.get()).exists){

         await chargeRef.update({
            title, amount, type, description
         })

         return {
            id: chargeRef.id,
            ...(await chargeRef.get()).data()
         }

      }else{
         throw new Error("Charge not found");
      }
          
   }else{
      throw new Error("Property not found");
   }
};

 module.exports = createPropertyCharge;

