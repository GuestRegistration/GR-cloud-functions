/**
 * update a property terms url
 */
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()


 const updatePropertyTerms = async (parent, {id, terms_url}) => {
     const propertyRef = firestore.collection(collections.property.main).doc(id)
   const updated = await propertyRef.update({
                            terms: terms_url,
                        })
   return (await propertyRef.get()).data();
}

 module.exports = updatePropertyTerms

