/**
 * Get a single reservation
 */

const collections = require('./../../../../../enums/collections')

const admin = require('./../../../../../admin')
const firestore = admin.firestore()

const getReservation = async (parent, {id}) => {
    const document = await firestore.collection(`${collections.reservation}`).doc(id).get()
    if(document.exists){
      return document.data()
    }
    return null
}
module.exports = getReservation