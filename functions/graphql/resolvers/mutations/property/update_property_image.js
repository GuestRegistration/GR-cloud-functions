/**
 * update a property image
 */
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()


 const updatePropertyImage = async (parent, {id, user_id, image}) => {
   await firestore.collection(collections.property.main).doc(id).update({
      image: image
   });
   return image;
}

 module.exports = updatePropertyImage

