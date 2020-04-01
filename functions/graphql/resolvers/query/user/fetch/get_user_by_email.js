/**
 * Get a single user email
 */
const client_middleware = require('./../../../../middleware/client_authorized')

const collections = require('../../../../../enums/collections')
const admin = require('../../../../../admin')
const firestore = admin.firestore()

const getUserByEmail = async (parent, {email}, context) =>  {
    client_middleware(context)
    const query =  await firestore.collection(collections.user.main).where('email', '==', email).get()
    const users = []
    if(!query.empty){
        query.forEach(user => {
            let data = user.data();
            data.id = user.ref.id
            users.push(data)
        })
      return users
    }
    return null
}

module.exports = getUserByEmail
