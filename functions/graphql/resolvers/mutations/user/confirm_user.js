
/**
 * Confirm if a user exist by email
 */

const collections = require('./../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()

const confirmation = async (parent, {email}) => {

   const result = await firestore.collection(collections.user).where('email', '==', email).get()
   if(result.size > 0){
       return true
   } 
   return false
}

module.exports = confirmation
