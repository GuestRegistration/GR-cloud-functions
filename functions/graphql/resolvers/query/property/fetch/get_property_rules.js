/**
 * Get list of property rules
 */

const collections = require('./../../../../../enums/collections')
const admin = require('./../../../../../admin')
const firestore = admin.firestore()

const getPropertRules = async (parent, {id}) =>  {
    const rules = await firestore.collection(collections.property.main).doc(id)
                                .collection(collections.property.meta.name)
                                .doc(collections.property.meta.documents.rules)
                                .get()
    if(rules.exists){
        return rules.data();
    }
    return null
    
}
module.exports = getPropertRules