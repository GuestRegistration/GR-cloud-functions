/**
 * Get list of properties
 */
const collections = require('./../../../../../enums/collections')
const client_middleware = require('./../../../../middleware/client_authorized')
const auth_middleware = require('./../../../../middleware/user_authenticated')
const admin = require('./../../../../../admin')
const firestore = admin.firestore()

 const getProperties = async (parent, args, context) => {
    client_middleware(context)
    const auth = auth_middleware(context)
    const properties = []

    if(auth){
        const QuerySnapshots = await firestore.collection(collections.property.main).where('user_id', '==', auth).get()
        
        QuerySnapshots.forEach((snapshot) => {
            let property = snapshot.data()
            property.id = snapshot.ref.id
            properties.push(property)
        })        
    }
    return properties;

 }

 module.exports = getProperties