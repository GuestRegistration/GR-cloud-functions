/**
 * Retrieve user by reference
 */

const client_middleware = require('../../../../middleware/client_authorized')
const auth_middleware = require('./../../../../middleware/user_authenticated')

const collections = require('../../../../../enums/collections')
const admin = require('../../../../../admin')
const firestore = admin.firestore()
const helper = require('./../../../../../helper')

const getUserIdentityById = async (parent, {user_id, identity_id}, context) =>  {
    client_middleware(context)
    const auth = auth_middleware(context)

    const idRef = firestore.collection(collections.user.main)
                            .doc(user_id)
                            .collection(collections.user.subcollections.identities)
                            .doc(identity_id)
    
    if(auth){
        const snapshot = await idRef.get()
        if(snapshot.exists){
            const identity = snapshot.data()
            identity.id = snapshot.ref.id

            // update the view history
            await idRef.collection('access_history').add({
                user_id: auth,
                client: context.auth.client_token,
                accessed_at: helper.nowTimestamp()
            })

            return identity;
        }
    }
    return null
}

module.exports = getUserIdentityById
