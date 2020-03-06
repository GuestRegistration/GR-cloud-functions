/**
 * Get user by phone
 */
const client_middleware = require('./../../../../middleware/client_authorized')

const collections = require('../../../../../enums/collections')
const admin = require('../../../../../admin')
const firestore = admin.firestore()

const getUserByPhone = async (parent, {phone}, context) =>  {
    client_middleware(context)
    
    const query =  await firestore.collection(collections.user.main).where('phone', '==', phone).get()
    const users = []
    if(!query.empty){
        query.forEach(user => {
            users.push(user.data())
        })
      return users
    }
    return null
}

module.exports = getUserByPhone
