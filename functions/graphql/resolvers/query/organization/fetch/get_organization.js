/**
 * Get a single organization
 */
const client_middleware = require('./../../../../middleware/client_authorized')

const collections = require('./../../../../../enums/collections')
const admin = require('./../../../../../admin')
const firestore = admin.firestore()

const getOrganization = async (parent, {id}, context) =>  {
  client_middleware(context)
  
  const document = await firestore.collection(collections.organization.main).doc(id).get()
    if(document.exists){
      let organization = document.data()
      organization.id = document.ref.id
      return organization
    }
    return null
}
module.exports = getOrganization