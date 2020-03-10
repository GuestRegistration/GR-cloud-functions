/**
 * Retrieve user identities
 */

const client_middleware = require('./../../../../middleware/client_authorized')

const collections = require('../../../../../enums/collections')
const admin = require('../../../../../admin')
const firestore = admin.firestore()

const getUserIdentities = async (parent, {id}, context) =>  {
    client_middleware(context)

    const identites = []
    const query = await firestore.collection(collections.user.main)
                            .doc(id)
                            .collection(collections.user.subcollections.identities)
                            .get()
    if(!query.empty){
        query.forEach( id => {
            let _id = id.data()
            _id.id = id.id
            _id.ref = id.ref.path
            identites.push(_id);
        })
      return identites
    }
    return null
}

module.exports = getUserIdentities
