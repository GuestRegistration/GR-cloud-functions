/**
 * create new reservation
 */
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()


 const createReservation = async (parent, {user_id, property_id, name, booking_channel, booking_no, amount_paid, checkin_date, checkout_date}) => {
    const reservation = {
        property_id, name, booking_channel, booking_no, amount_paid, checkin_date, checkout_date 
    }
    const result = await firestore.collection(collections.reservation.main).add(reservation)
    reservation.id = result.id
    return reservation;
}

 module.exports = createReservation