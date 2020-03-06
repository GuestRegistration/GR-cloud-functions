/**
 * Get a single reservation
 */
const client_middleware = require('./../../../../middleware/client_authorized')

const collections = require('./../../../../../enums/collections')
const admin = require('./../../../../../admin')
const firestore = admin.firestore()

const getReservation = async (parent, {id}, context) => {
    client_middleware(context)
    const document = await firestore.collection(collections.reservation.main).doc(id).get()
    if(document.exists){
      let reservation = document.data()
      reservation.id = document.ref.id
      return reservation
    }
    return null
}
module.exports = getReservation