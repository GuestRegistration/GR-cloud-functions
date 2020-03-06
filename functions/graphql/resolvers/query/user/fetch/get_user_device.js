/**
 * Get a single user device
 */
const client_middleware = require('./../../../../middleware/client_authorized')

const collections = require('../../../../../enums/collections')
const admin = require('../../../../../admin')
const firestore = admin.firestore()

const getUserDevice = async (parent, {id}, context) =>  {
    client_middleware(context)
    
    const document = await firestore.collection(collections.user.main)
                            .doc(id)
                            .collection(collections.user.meta.name)
                            .doc(collections.user.meta.documents.device)
                            .get()
    if(document.exists){
      return document.data()
    }
    return null
}

module.exports = getUserDevice
