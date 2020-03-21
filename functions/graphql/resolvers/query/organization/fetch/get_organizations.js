/**
 * Get list of organizations
 */
const client_middleware = require('./../../../../middleware/client_authorized')

const collections = require('./../../../../../enums/collections')
const admin = require('./../../../../../admin')
const firestore = admin.firestore()

const getOrganizations = async (parent, args, context) =>  {
  client_middleware(context)
  let orgs = [];
  const documents = await firestore.collection(collections.organization.main).get()
    if(!documents.empty){
        documents.forEach(document => {
            let org = document.data()
            org.id = document.ref.id
            orgs.push(org)
        })
    }
    return orgs
}
module.exports = getOrganizations