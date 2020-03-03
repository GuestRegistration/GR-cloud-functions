/**
 * update a property rules
 */
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const helper = require('./../../../../helper')
const firestore = admin.firestore()


 const updatePropertyImage = async (parent, {id, rules}) => {
     const rulesRef = firestore.collection(collections.property.main).doc(id)
                    .collection(collections.property.meta.name)
                    .doc(collections.property.meta.documents.rules)
   const updated = await rulesRef.set({
                            property_id: id,
                            rules: rules,
                            updated_at: helper.nowTimestamp()
                        })
  
   return (await rulesRef.get()).data();
}

 module.exports = updatePropertyImage

