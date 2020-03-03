/**
 * create user identity
 */
const collections = require('../../../../enums/collections')
const admin = require('../../../../admin')
const firestore = admin.firestore()

const createUserIdentity = async (parent, {id, title, country, document_type, document_url}) => {
    const identity = {
        user_id:id, title, country, document_type, document_url
    }
    const IdCollectionRef = firestore.collection(collections.user.main).doc(id)
                .collection(collections.user.subcollections.identities)

   const result = await IdCollectionRef.add(identity)
    await IdCollectionRef.doc(result.id).update({
        id: result.id,
        verified_at: null
    })
    const newId = await IdCollectionRef.doc(result.id).get()
    const newId_ = newId.data()
    newId_.id =  newId.id
    newId_.ref = newId.ref.path
    return newId_
}

module.exports = createUserIdentity;