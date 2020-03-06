/**
 * update a property image
 */

 //  middlewares
const client_middleware = require('./../../../middleware/client_authorized')
const user_middleware = require('./../../../middleware/user_authorized')

const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()


 const updatePropertyImage = async (parent, {id, image}, context) => {
   client_middleware(context)
   const property = await firestore.collection(collections.property.main).doc(id).get()
   if(property.exists){
      user_middleware(context, property.data().user_id)
      await firestore.collection(collections.property.main).doc(id).update({
         image: image
      });
      return image;
   }else{
      throw new Error("Property do not exist")
   }
}

 module.exports = updatePropertyImage

