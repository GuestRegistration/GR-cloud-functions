/**
 * Get a single property
 */
const collections = require('./../../../../../enums/collections')
const admin = require('./../../../../../admin')
const firestore = admin.firestore()

const getProperty = async (parent, {id}) =>  {
    const document = await firestore.collection(collections.property.main).doc(id).get()
    if(document.exists){
      let property = document.data()
      property.id = document.ref.id
      return property
    }
    return null
}
module.exports = getProperty