/**
 * Get list of properties
 */
const collections = require('./../../../../../enums/collections')

const admin = require('./../../../../../admin')
const firestore = admin.firestore()

 const getProperties = async (parent) => {
    const properties = []
    const QuerySnapshots = await firestore.collection(collections.property.main).get()
    
    QuerySnapshots.forEach((snapshot) => {
        properties.push(snapshot.data())
    })
    
    return properties;

 }

 module.exports = getProperties