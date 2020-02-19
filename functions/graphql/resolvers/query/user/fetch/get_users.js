

const collections = require('./../../../../../enums/collections')

const admin = require('./../../../../../admin')
const firestore = admin.firestore()

const getUsers = async (parent) => {
    const users = []
    const QuerySnapshots = await firestore.collection(collections.user).where('timestamp.deleted_at', '==', null).get()
    
    QuerySnapshots.forEach((snapshot) => {
        users.push(snapshot.data())
    })
    
    return users;
   
}


module.exports = getUsers
