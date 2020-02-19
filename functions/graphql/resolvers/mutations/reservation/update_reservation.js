/**
 * update a reservation
 */

const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()

const updateReservation = async (parent, {id, name, booking_channel, booking_no, amount_paid}) => {
    const reservation = {
        id, name, booking_channel, booking_no, amount_paid
    }
    const result = await firestore.collection(collections.reservation).doc(id).update(reservation);
    return reservation;
}

module.exports = updateReservation