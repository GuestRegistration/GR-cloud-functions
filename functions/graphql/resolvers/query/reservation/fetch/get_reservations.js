/**
 * Get list of reservations
 */
const client_middleware = require('./../../../../middleware/client_authorized')

const collections = require('./../../../../../enums/collections')
const admin = require('./../../../../../admin')
const firestore = admin.firestore()

const getReservations = async (parent, args, context) => {
    client_middleware(context)
    const reservations = []
    const QuerySnapshots = await firestore.collection(collections.reservation.main).get()
    
    QuerySnapshots.forEach((snapshot) => {
        reservations.push(snapshot.data())
    })
    return reservations;
}

module.exports = getReservations