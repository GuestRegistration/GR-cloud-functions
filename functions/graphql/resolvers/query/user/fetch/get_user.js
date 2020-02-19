// get a single user
const collections = require('./../../../../../enums/collections')
const admin = require('./../../../../../admin')
const firestore = admin.firestore()

const getUser = async (parent, {id}) =>  {
    const document = await firestore.collection(`${collections.user}`).doc(id).get()
    if(document.exists){
      return document.data()
    }
    return null
}

module.exports = getUser
