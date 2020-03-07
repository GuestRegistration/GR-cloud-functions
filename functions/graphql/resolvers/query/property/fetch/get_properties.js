/**
 * Get list of properties
 */
const collections = require('./../../../../../enums/collections')
const client_middleware = require('./../../../../middleware/client_authorized')

const admin = require('./../../../../../admin')
const firestore = admin.firestore()

 const getProperties = async (parent, args, context) => {
    client_middleware(context)
    
    const properties = []
    const QuerySnapshots = await firestore.collection(collections.property.main).get()
    
    QuerySnapshots.forEach((snapshot) => {
        let property = snapshot.data()
        property.id = snapshot.ref.id
        properties.push(property)
    })        
    return properties;

 }

 module.exports = getProperties