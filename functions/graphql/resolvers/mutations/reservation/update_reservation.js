/**
 * update a reservation
 */

const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()

const updateReservation = async (parent, {id, name, booking_channel, booking_no, amount_paid, checkin_date, checkout_date}) => {
    const reservation = {
        id, name, booking_channel, booking_no, amount_paid
    }
    if(checkin_date){
        reservation.checkin_date = checkin_date
    }
    if(checkout_date){
        reservation.checkout_date = checkout_date
    }
    const result = await firestore.collection(collections.reservation.main).doc(id).update(reservation);
    return reservation;
}

module.exports = updateReservation