/**
 * update a property terms url
 */

  //  middlewares
const client_middleware = require('./../../../middleware/client_authorized')
const user_middleware = require('./../../../middleware/user_authorized')
 
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()


 const updatePropertyTerms = async (parent, {id, terms_url}, context) => {
   client_middleware(context)
     
   const propertyRef = firestore.collection(collections.property.main).doc(id)
   const property = await propertyRef.get()
   if(property.exists){
       user_middleware(context, property.data().user_id)
                       
       const updated = await propertyRef.update({
                                   terms: terms_url
                               })
       return (await propertyRef.get()).data();
   } else{
       throw new Error('Property does not exist')
   } 
  
}

 module.exports = updatePropertyTerms

