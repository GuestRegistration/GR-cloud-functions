
/**
 * Confirm if a user exist by email
 */

 //  middlewares
const client_middleware = require('./../../../middleware/client_authorized')

const collections = require('./../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()

const confirmation = async (parent, {email}, context) => {
    client_middleware(context)
   const result = await firestore.collection(collections.user.main).where('email', '==', email).get()
   if(result.size > 0){
       return true
   } 
   return false
}

module.exports = confirmation
