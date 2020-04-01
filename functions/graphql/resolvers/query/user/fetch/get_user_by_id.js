/**
 * Get single user by ID
 */

const client_middleware = require('./../../../../middleware/client_authorized')

const collections = require('../../../../../enums/collections')
const admin = require('../../../../../admin')
const firestore = admin.firestore()

const getUserByID = async (parent, {id}, context) =>  {
    client_middleware(context)
    
    const document = await firestore.collection(collections.user.main).doc(id).get()
    if(document.exists){
      const user = document.data()
      user.id = document.ref.id 
      return user
    }
    return null
}

module.exports = getUserByID
