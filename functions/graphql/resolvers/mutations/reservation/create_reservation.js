/**
 * create new reservation
 */
const collections = require('../../../../enums/collections')
const admin = require('./../../../../admin')
const sub = require('./../../../pubsub');
const firestore = admin.firestore()


 const createReservation = async (parent, {user_id, property_id, name, email, booking_channel, booking_no, amount_paid, checkin_date, checkout_date}) => {
    const reservation = {
        property_id, name, email, booking_channel, booking_no, amount_paid, checkin_date, checkout_date 
    }
    const result = await firestore.collection(collections.reservation.main).add(reservation)
    reservation.id = result.id
    reservation.checkin_url = `https://testapp.guestregistration.com/r/${reservation.id}`

    // update the reservation with the checkin url
    await firestore.collection(collections.reservation.main).doc(reservation.id).update({
        checkin_url:  reservation.checkin_url,
    })
    //publish the new reservation to it subscriptions
    // sub.pubsub.publish(sub.subscriptions.reservation.create, {ReservationCreated:reservation})
    return reservation;
}

 module.exports = createReservation