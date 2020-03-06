
/**
 * Get list of users
 */
const client_middleware = require('./../../../../middleware/client_authorized')

const collections = require('./../../../../../enums/collections')
const admin = require('./../../../../../admin')
const firestore = admin.firestore()

const getUsers = async (parent, args, context) => {
    client_middleware(context)

    const users = []
    const QuerySnapshots = await firestore.collection(collections.user.main).where('timestamp.deleted_at', '==', null).get()
    
    QuerySnapshots.forEach((snapshot) => {
        users.push(snapshot.data())
    })
    
    return users;
   
}


module.exports = getUsers
