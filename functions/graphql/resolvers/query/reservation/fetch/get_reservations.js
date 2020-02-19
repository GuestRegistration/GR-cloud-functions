/**
 * Get list of reservations
 */
const collections = require('./../../../../../enums/collections')

const admin = require('./../../../../../admin')
const firestore = admin.firestore()

const getReservations = async (parent) => {
    const reservations = []
    const QuerySnapshots = await firestore.collection(collections.reservation.main).get()
    
    QuerySnapshots.forEach((snapshot) => {
        reservations.push(snapshot.data())
    })
    return reservations;
}

module.exports = getReservations