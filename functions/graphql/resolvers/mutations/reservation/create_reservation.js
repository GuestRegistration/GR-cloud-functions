/**
 * create new reservation
 */
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const firestore = admin.firestore()


 const createReservation = async (parent, {user_id, name, booking_channel, booking_no, amount_paid, property_id}) => {
    const reservation = {
        name, booking_channel, booking_no, amount_paid, property_id
    }
    const result = await firestore.collection(collections.reservation.main).add(reservation)
    reservation.id = result.id
    return reservation;
}

 module.exports = createReservation